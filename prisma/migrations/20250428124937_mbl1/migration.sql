-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "documentid" INTEGER NOT NULL,
    "starttime" TIMESTAMP(6) NOT NULL,
    "endtime" TIMESTAMP(6) NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255),
    "isbn" VARCHAR(255),
    "description" TEXT,
    "coverurl" TEXT,
    "filepath" TEXT NOT NULL,
    "filehash" CHAR(64) NOT NULL,
    "uploadedbyid" INTEGER NOT NULL,
    "tableofcontents" JSON NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL,
    "lastopened" TIMESTAMP(6),
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentPreference" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "documentid" INTEGER NOT NULL,
    "theme" VARCHAR(100) NOT NULL,
    "fontsize" VARCHAR(100) NOT NULL,
    "notes" JSON NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" SERIAL NOT NULL,
    "documentid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "pagenumber" INTEGER NOT NULL,
    "coordinates" JSON NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordhash" VARCHAR(255),
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_isbn_key" ON "Document"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Document_filehash_key" ON "Document"("filehash");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "fk_analytics_document" FOREIGN KEY ("documentid") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "fk_analytics_user" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "fk_uploadedby" FOREIGN KEY ("uploadedbyid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentPreference" ADD CONSTRAINT "fk_preference_document" FOREIGN KEY ("documentid") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentPreference" ADD CONSTRAINT "fk_preference_user" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "fk_highlight_document" FOREIGN KEY ("documentid") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "fk_highlight_user" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
