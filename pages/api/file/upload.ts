// pages/api/file/upload.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

import { NextApiRequest, NextApiResponse } from "next";

const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const filename = Array.isArray(fields.filename)
      ? fields.filename[0]
      : fields.filename;
    const file = files.file && files.file[0];
    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    if (!file || !filename) {
      return res.status(400).json({ error: "File and filename are required" });
    }

    const formData = new FormData();
    formData.append("pdf", fs.createReadStream(file.filepath), {
      filename: filename,
      contentType: file.mimetype || undefined,
    });

    try {
      const response = await axios.post(
        `${process.env.EXPRESS_API_URL}/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 60000 // Increased timeout to 60 seconds
        }
      );

      return res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error uploading file to external API" });
    }
  });
};

export default uploadFile;