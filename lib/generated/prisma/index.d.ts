
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Analytics
 * 
 */
export type Analytics = $Result.DefaultSelection<Prisma.$AnalyticsPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentPreference
 * 
 */
export type DocumentPreference = $Result.DefaultSelection<Prisma.$DocumentPreferencePayload>
/**
 * Model Highlight
 * 
 */
export type Highlight = $Result.DefaultSelection<Prisma.$HighlightPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Chapter
 * 
 */
export type Chapter = $Result.DefaultSelection<Prisma.$ChapterPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Analytics
 * const analytics = await prisma.analytics.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Analytics
   * const analytics = await prisma.analytics.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.analytics`: Exposes CRUD operations for the **Analytics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Analytics
    * const analytics = await prisma.analytics.findMany()
    * ```
    */
  get analytics(): Prisma.AnalyticsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentPreference`: Exposes CRUD operations for the **DocumentPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentPreferences
    * const documentPreferences = await prisma.documentPreference.findMany()
    * ```
    */
  get documentPreference(): Prisma.DocumentPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.highlight`: Exposes CRUD operations for the **Highlight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Highlights
    * const highlights = await prisma.highlight.findMany()
    * ```
    */
  get highlight(): Prisma.HighlightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chapter`: Exposes CRUD operations for the **Chapter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chapters
    * const chapters = await prisma.chapter.findMany()
    * ```
    */
  get chapter(): Prisma.ChapterDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Analytics: 'Analytics',
    Document: 'Document',
    DocumentPreference: 'DocumentPreference',
    Highlight: 'Highlight',
    User: 'User',
    Chapter: 'Chapter'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "analytics" | "document" | "documentPreference" | "highlight" | "user" | "chapter"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Analytics: {
        payload: Prisma.$AnalyticsPayload<ExtArgs>
        fields: Prisma.AnalyticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          findMany: {
            args: Prisma.AnalyticsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>[]
          }
          create: {
            args: Prisma.AnalyticsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          createMany: {
            args: Prisma.AnalyticsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          update: {
            args: Prisma.AnalyticsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalytics>
          }
          groupBy: {
            args: Prisma.AnalyticsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentPreference: {
        payload: Prisma.$DocumentPreferencePayload<ExtArgs>
        fields: Prisma.DocumentPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>
          }
          findFirst: {
            args: Prisma.DocumentPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>
          }
          findMany: {
            args: Prisma.DocumentPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>[]
          }
          create: {
            args: Prisma.DocumentPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>
          }
          createMany: {
            args: Prisma.DocumentPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>[]
          }
          delete: {
            args: Prisma.DocumentPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>
          }
          update: {
            args: Prisma.DocumentPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>
          }
          deleteMany: {
            args: Prisma.DocumentPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>[]
          }
          upsert: {
            args: Prisma.DocumentPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPreferencePayload>
          }
          aggregate: {
            args: Prisma.DocumentPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentPreference>
          }
          groupBy: {
            args: Prisma.DocumentPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentPreferenceCountAggregateOutputType> | number
          }
        }
      }
      Highlight: {
        payload: Prisma.$HighlightPayload<ExtArgs>
        fields: Prisma.HighlightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HighlightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HighlightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>
          }
          findFirst: {
            args: Prisma.HighlightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HighlightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>
          }
          findMany: {
            args: Prisma.HighlightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>[]
          }
          create: {
            args: Prisma.HighlightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>
          }
          createMany: {
            args: Prisma.HighlightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HighlightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>[]
          }
          delete: {
            args: Prisma.HighlightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>
          }
          update: {
            args: Prisma.HighlightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>
          }
          deleteMany: {
            args: Prisma.HighlightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HighlightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HighlightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>[]
          }
          upsert: {
            args: Prisma.HighlightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HighlightPayload>
          }
          aggregate: {
            args: Prisma.HighlightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHighlight>
          }
          groupBy: {
            args: Prisma.HighlightGroupByArgs<ExtArgs>
            result: $Utils.Optional<HighlightGroupByOutputType>[]
          }
          count: {
            args: Prisma.HighlightCountArgs<ExtArgs>
            result: $Utils.Optional<HighlightCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Chapter: {
        payload: Prisma.$ChapterPayload<ExtArgs>
        fields: Prisma.ChapterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChapterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChapterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>
          }
          findFirst: {
            args: Prisma.ChapterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChapterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>
          }
          findMany: {
            args: Prisma.ChapterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>[]
          }
          create: {
            args: Prisma.ChapterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>
          }
          createMany: {
            args: Prisma.ChapterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChapterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>[]
          }
          delete: {
            args: Prisma.ChapterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>
          }
          update: {
            args: Prisma.ChapterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>
          }
          deleteMany: {
            args: Prisma.ChapterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChapterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChapterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>[]
          }
          upsert: {
            args: Prisma.ChapterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapterPayload>
          }
          aggregate: {
            args: Prisma.ChapterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChapter>
          }
          groupBy: {
            args: Prisma.ChapterGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChapterGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChapterCountArgs<ExtArgs>
            result: $Utils.Optional<ChapterCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    analytics?: AnalyticsOmit
    document?: DocumentOmit
    documentPreference?: DocumentPreferenceOmit
    highlight?: HighlightOmit
    user?: UserOmit
    chapter?: ChapterOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    Analytics: number
    DocumentPreference: number
    Highlight: number
    Chapters: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Analytics?: boolean | DocumentCountOutputTypeCountAnalyticsArgs
    DocumentPreference?: boolean | DocumentCountOutputTypeCountDocumentPreferenceArgs
    Highlight?: boolean | DocumentCountOutputTypeCountHighlightArgs
    Chapters?: boolean | DocumentCountOutputTypeCountChaptersArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountAnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountDocumentPreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPreferenceWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountHighlightArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HighlightWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountChaptersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChapterWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Analytics: number
    Document: number
    DocumentPreference: number
    Highlight: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Analytics?: boolean | UserCountOutputTypeCountAnalyticsArgs
    Document?: boolean | UserCountOutputTypeCountDocumentArgs
    DocumentPreference?: boolean | UserCountOutputTypeCountDocumentPreferenceArgs
    Highlight?: boolean | UserCountOutputTypeCountHighlightArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentPreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPreferenceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHighlightArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HighlightWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Analytics
   */

  export type AggregateAnalytics = {
    _count: AnalyticsCountAggregateOutputType | null
    _avg: AnalyticsAvgAggregateOutputType | null
    _sum: AnalyticsSumAggregateOutputType | null
    _min: AnalyticsMinAggregateOutputType | null
    _max: AnalyticsMaxAggregateOutputType | null
  }

  export type AnalyticsAvgAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
    duration: number | null
  }

  export type AnalyticsSumAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
    duration: number | null
  }

  export type AnalyticsMinAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
    starttime: Date | null
    endtime: Date | null
    duration: number | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type AnalyticsMaxAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
    starttime: Date | null
    endtime: Date | null
    duration: number | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type AnalyticsCountAggregateOutputType = {
    id: number
    userid: number
    documentid: number
    starttime: number
    endtime: number
    duration: number
    createdat: number
    updatedat: number
    _all: number
  }


  export type AnalyticsAvgAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    duration?: true
  }

  export type AnalyticsSumAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    duration?: true
  }

  export type AnalyticsMinAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    starttime?: true
    endtime?: true
    duration?: true
    createdat?: true
    updatedat?: true
  }

  export type AnalyticsMaxAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    starttime?: true
    endtime?: true
    duration?: true
    createdat?: true
    updatedat?: true
  }

  export type AnalyticsCountAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    starttime?: true
    endtime?: true
    duration?: true
    createdat?: true
    updatedat?: true
    _all?: true
  }

  export type AnalyticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analytics to aggregate.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Analytics
    **/
    _count?: true | AnalyticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalyticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalyticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsMaxAggregateInputType
  }

  export type GetAnalyticsAggregateType<T extends AnalyticsAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalytics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalytics[P]>
      : GetScalarType<T[P], AggregateAnalytics[P]>
  }




  export type AnalyticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsWhereInput
    orderBy?: AnalyticsOrderByWithAggregationInput | AnalyticsOrderByWithAggregationInput[]
    by: AnalyticsScalarFieldEnum[] | AnalyticsScalarFieldEnum
    having?: AnalyticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsCountAggregateInputType | true
    _avg?: AnalyticsAvgAggregateInputType
    _sum?: AnalyticsSumAggregateInputType
    _min?: AnalyticsMinAggregateInputType
    _max?: AnalyticsMaxAggregateInputType
  }

  export type AnalyticsGroupByOutputType = {
    id: number
    userid: number
    documentid: number
    starttime: Date
    endtime: Date
    duration: number
    createdat: Date
    updatedat: Date
    _count: AnalyticsCountAggregateOutputType | null
    _avg: AnalyticsAvgAggregateOutputType | null
    _sum: AnalyticsSumAggregateOutputType | null
    _min: AnalyticsMinAggregateOutputType | null
    _max: AnalyticsMaxAggregateOutputType | null
  }

  type GetAnalyticsGroupByPayload<T extends AnalyticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userid?: boolean
    documentid?: boolean
    starttime?: boolean
    endtime?: boolean
    duration?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analytics"]>

  export type AnalyticsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userid?: boolean
    documentid?: boolean
    starttime?: boolean
    endtime?: boolean
    duration?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analytics"]>

  export type AnalyticsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userid?: boolean
    documentid?: boolean
    starttime?: boolean
    endtime?: boolean
    duration?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analytics"]>

  export type AnalyticsSelectScalar = {
    id?: boolean
    userid?: boolean
    documentid?: boolean
    starttime?: boolean
    endtime?: boolean
    duration?: boolean
    createdat?: boolean
    updatedat?: boolean
  }

  export type AnalyticsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userid" | "documentid" | "starttime" | "endtime" | "duration" | "createdat" | "updatedat", ExtArgs["result"]["analytics"]>
  export type AnalyticsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnalyticsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnalyticsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnalyticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Analytics"
    objects: {
      Document: Prisma.$DocumentPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userid: number
      documentid: number
      starttime: Date
      endtime: Date
      duration: number
      createdat: Date
      updatedat: Date
    }, ExtArgs["result"]["analytics"]>
    composites: {}
  }

  type AnalyticsGetPayload<S extends boolean | null | undefined | AnalyticsDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsPayload, S>

  type AnalyticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticsCountAggregateInputType | true
    }

  export interface AnalyticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Analytics'], meta: { name: 'Analytics' } }
    /**
     * Find zero or one Analytics that matches the filter.
     * @param {AnalyticsFindUniqueArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsFindUniqueArgs>(args: SelectSubset<T, AnalyticsFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Analytics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticsFindUniqueOrThrowArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsFindFirstArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsFindFirstArgs>(args?: SelectSubset<T, AnalyticsFindFirstArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analytics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsFindFirstOrThrowArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Analytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Analytics
     * const analytics = await prisma.analytics.findMany()
     * 
     * // Get first 10 Analytics
     * const analytics = await prisma.analytics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsWithIdOnly = await prisma.analytics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsFindManyArgs>(args?: SelectSubset<T, AnalyticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Analytics.
     * @param {AnalyticsCreateArgs} args - Arguments to create a Analytics.
     * @example
     * // Create one Analytics
     * const Analytics = await prisma.analytics.create({
     *   data: {
     *     // ... data to create a Analytics
     *   }
     * })
     * 
     */
    create<T extends AnalyticsCreateArgs>(args: SelectSubset<T, AnalyticsCreateArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Analytics.
     * @param {AnalyticsCreateManyArgs} args - Arguments to create many Analytics.
     * @example
     * // Create many Analytics
     * const analytics = await prisma.analytics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsCreateManyArgs>(args?: SelectSubset<T, AnalyticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Analytics and returns the data saved in the database.
     * @param {AnalyticsCreateManyAndReturnArgs} args - Arguments to create many Analytics.
     * @example
     * // Create many Analytics
     * const analytics = await prisma.analytics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Analytics and only return the `id`
     * const analyticsWithIdOnly = await prisma.analytics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Analytics.
     * @param {AnalyticsDeleteArgs} args - Arguments to delete one Analytics.
     * @example
     * // Delete one Analytics
     * const Analytics = await prisma.analytics.delete({
     *   where: {
     *     // ... filter to delete one Analytics
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsDeleteArgs>(args: SelectSubset<T, AnalyticsDeleteArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Analytics.
     * @param {AnalyticsUpdateArgs} args - Arguments to update one Analytics.
     * @example
     * // Update one Analytics
     * const analytics = await prisma.analytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsUpdateArgs>(args: SelectSubset<T, AnalyticsUpdateArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Analytics.
     * @param {AnalyticsDeleteManyArgs} args - Arguments to filter Analytics to delete.
     * @example
     * // Delete a few Analytics
     * const { count } = await prisma.analytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsDeleteManyArgs>(args?: SelectSubset<T, AnalyticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Analytics
     * const analytics = await prisma.analytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsUpdateManyArgs>(args: SelectSubset<T, AnalyticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analytics and returns the data updated in the database.
     * @param {AnalyticsUpdateManyAndReturnArgs} args - Arguments to update many Analytics.
     * @example
     * // Update many Analytics
     * const analytics = await prisma.analytics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Analytics and only return the `id`
     * const analyticsWithIdOnly = await prisma.analytics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalyticsUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Analytics.
     * @param {AnalyticsUpsertArgs} args - Arguments to update or create a Analytics.
     * @example
     * // Update or create a Analytics
     * const analytics = await prisma.analytics.upsert({
     *   create: {
     *     // ... data to create a Analytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Analytics we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsUpsertArgs>(args: SelectSubset<T, AnalyticsUpsertArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsCountArgs} args - Arguments to filter Analytics to count.
     * @example
     * // Count the number of Analytics
     * const count = await prisma.analytics.count({
     *   where: {
     *     // ... the filter for the Analytics we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsCountArgs>(
      args?: Subset<T, AnalyticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalyticsAggregateArgs>(args: Subset<T, AnalyticsAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsAggregateType<T>>

    /**
     * Group by Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalyticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Analytics model
   */
  readonly fields: AnalyticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Analytics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Analytics model
   */
  interface AnalyticsFieldRefs {
    readonly id: FieldRef<"Analytics", 'Int'>
    readonly userid: FieldRef<"Analytics", 'Int'>
    readonly documentid: FieldRef<"Analytics", 'Int'>
    readonly starttime: FieldRef<"Analytics", 'DateTime'>
    readonly endtime: FieldRef<"Analytics", 'DateTime'>
    readonly duration: FieldRef<"Analytics", 'Int'>
    readonly createdat: FieldRef<"Analytics", 'DateTime'>
    readonly updatedat: FieldRef<"Analytics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Analytics findUnique
   */
  export type AnalyticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics findUniqueOrThrow
   */
  export type AnalyticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics findFirst
   */
  export type AnalyticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analytics.
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analytics.
     */
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * Analytics findFirstOrThrow
   */
  export type AnalyticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analytics.
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analytics.
     */
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * Analytics findMany
   */
  export type AnalyticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Analytics.
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * Analytics create
   */
  export type AnalyticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * The data needed to create a Analytics.
     */
    data: XOR<AnalyticsCreateInput, AnalyticsUncheckedCreateInput>
  }

  /**
   * Analytics createMany
   */
  export type AnalyticsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Analytics.
     */
    data: AnalyticsCreateManyInput | AnalyticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Analytics createManyAndReturn
   */
  export type AnalyticsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * The data used to create many Analytics.
     */
    data: AnalyticsCreateManyInput | AnalyticsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analytics update
   */
  export type AnalyticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * The data needed to update a Analytics.
     */
    data: XOR<AnalyticsUpdateInput, AnalyticsUncheckedUpdateInput>
    /**
     * Choose, which Analytics to update.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics updateMany
   */
  export type AnalyticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Analytics.
     */
    data: XOR<AnalyticsUpdateManyMutationInput, AnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which Analytics to update
     */
    where?: AnalyticsWhereInput
    /**
     * Limit how many Analytics to update.
     */
    limit?: number
  }

  /**
   * Analytics updateManyAndReturn
   */
  export type AnalyticsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * The data used to update Analytics.
     */
    data: XOR<AnalyticsUpdateManyMutationInput, AnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which Analytics to update
     */
    where?: AnalyticsWhereInput
    /**
     * Limit how many Analytics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analytics upsert
   */
  export type AnalyticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * The filter to search for the Analytics to update in case it exists.
     */
    where: AnalyticsWhereUniqueInput
    /**
     * In case the Analytics found by the `where` argument doesn't exist, create a new Analytics with this data.
     */
    create: XOR<AnalyticsCreateInput, AnalyticsUncheckedCreateInput>
    /**
     * In case the Analytics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsUpdateInput, AnalyticsUncheckedUpdateInput>
  }

  /**
   * Analytics delete
   */
  export type AnalyticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    /**
     * Filter which Analytics to delete.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics deleteMany
   */
  export type AnalyticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analytics to delete
     */
    where?: AnalyticsWhereInput
    /**
     * Limit how many Analytics to delete.
     */
    limit?: number
  }

  /**
   * Analytics without action
   */
  export type AnalyticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    id: number | null
    uploadedbyid: number | null
    progress: number | null
  }

  export type DocumentSumAggregateOutputType = {
    id: number | null
    uploadedbyid: number | null
    progress: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: number | null
    title: string | null
    author: string | null
    isbn: string | null
    description: string | null
    coverurl: string | null
    filepath: string | null
    filehash: string | null
    uploadedbyid: number | null
    progress: number | null
    lastopened: Date | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: number | null
    title: string | null
    author: string | null
    isbn: string | null
    description: string | null
    coverurl: string | null
    filepath: string | null
    filehash: string | null
    uploadedbyid: number | null
    progress: number | null
    lastopened: Date | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    title: number
    author: number
    isbn: number
    description: number
    coverurl: number
    filepath: number
    filehash: number
    uploadedbyid: number
    tableofcontents: number
    progress: number
    lastopened: number
    createdat: number
    updatedat: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    id?: true
    uploadedbyid?: true
    progress?: true
  }

  export type DocumentSumAggregateInputType = {
    id?: true
    uploadedbyid?: true
    progress?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    description?: true
    coverurl?: true
    filepath?: true
    filehash?: true
    uploadedbyid?: true
    progress?: true
    lastopened?: true
    createdat?: true
    updatedat?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    description?: true
    coverurl?: true
    filepath?: true
    filehash?: true
    uploadedbyid?: true
    progress?: true
    lastopened?: true
    createdat?: true
    updatedat?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    description?: true
    coverurl?: true
    filepath?: true
    filehash?: true
    uploadedbyid?: true
    tableofcontents?: true
    progress?: true
    lastopened?: true
    createdat?: true
    updatedat?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: number
    title: string
    author: string | null
    isbn: string | null
    description: string | null
    coverurl: string | null
    filepath: string
    filehash: string
    uploadedbyid: number
    tableofcontents: JsonValue
    progress: number
    lastopened: Date | null
    createdat: Date
    updatedat: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    coverurl?: boolean
    filepath?: boolean
    filehash?: boolean
    uploadedbyid?: boolean
    tableofcontents?: boolean
    progress?: boolean
    lastopened?: boolean
    createdat?: boolean
    updatedat?: boolean
    Analytics?: boolean | Document$AnalyticsArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    DocumentPreference?: boolean | Document$DocumentPreferenceArgs<ExtArgs>
    Highlight?: boolean | Document$HighlightArgs<ExtArgs>
    Chapters?: boolean | Document$ChaptersArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    coverurl?: boolean
    filepath?: boolean
    filehash?: boolean
    uploadedbyid?: boolean
    tableofcontents?: boolean
    progress?: boolean
    lastopened?: boolean
    createdat?: boolean
    updatedat?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    coverurl?: boolean
    filepath?: boolean
    filehash?: boolean
    uploadedbyid?: boolean
    tableofcontents?: boolean
    progress?: boolean
    lastopened?: boolean
    createdat?: boolean
    updatedat?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    coverurl?: boolean
    filepath?: boolean
    filehash?: boolean
    uploadedbyid?: boolean
    tableofcontents?: boolean
    progress?: boolean
    lastopened?: boolean
    createdat?: boolean
    updatedat?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "author" | "isbn" | "description" | "coverurl" | "filepath" | "filehash" | "uploadedbyid" | "tableofcontents" | "progress" | "lastopened" | "createdat" | "updatedat", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Analytics?: boolean | Document$AnalyticsArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    DocumentPreference?: boolean | Document$DocumentPreferenceArgs<ExtArgs>
    Highlight?: boolean | Document$HighlightArgs<ExtArgs>
    Chapters?: boolean | Document$ChaptersArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      Analytics: Prisma.$AnalyticsPayload<ExtArgs>[]
      User: Prisma.$UserPayload<ExtArgs>
      DocumentPreference: Prisma.$DocumentPreferencePayload<ExtArgs>[]
      Highlight: Prisma.$HighlightPayload<ExtArgs>[]
      Chapters: Prisma.$ChapterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      author: string | null
      isbn: string | null
      description: string | null
      coverurl: string | null
      filepath: string
      filehash: string
      uploadedbyid: number
      tableofcontents: Prisma.JsonValue
      progress: number
      lastopened: Date | null
      createdat: Date
      updatedat: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Analytics<T extends Document$AnalyticsArgs<ExtArgs> = {}>(args?: Subset<T, Document$AnalyticsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    DocumentPreference<T extends Document$DocumentPreferenceArgs<ExtArgs> = {}>(args?: Subset<T, Document$DocumentPreferenceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Highlight<T extends Document$HighlightArgs<ExtArgs> = {}>(args?: Subset<T, Document$HighlightArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Chapters<T extends Document$ChaptersArgs<ExtArgs> = {}>(args?: Subset<T, Document$ChaptersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'Int'>
    readonly title: FieldRef<"Document", 'String'>
    readonly author: FieldRef<"Document", 'String'>
    readonly isbn: FieldRef<"Document", 'String'>
    readonly description: FieldRef<"Document", 'String'>
    readonly coverurl: FieldRef<"Document", 'String'>
    readonly filepath: FieldRef<"Document", 'String'>
    readonly filehash: FieldRef<"Document", 'String'>
    readonly uploadedbyid: FieldRef<"Document", 'Int'>
    readonly tableofcontents: FieldRef<"Document", 'Json'>
    readonly progress: FieldRef<"Document", 'Float'>
    readonly lastopened: FieldRef<"Document", 'DateTime'>
    readonly createdat: FieldRef<"Document", 'DateTime'>
    readonly updatedat: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.Analytics
   */
  export type Document$AnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    where?: AnalyticsWhereInput
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    cursor?: AnalyticsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * Document.DocumentPreference
   */
  export type Document$DocumentPreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    where?: DocumentPreferenceWhereInput
    orderBy?: DocumentPreferenceOrderByWithRelationInput | DocumentPreferenceOrderByWithRelationInput[]
    cursor?: DocumentPreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentPreferenceScalarFieldEnum | DocumentPreferenceScalarFieldEnum[]
  }

  /**
   * Document.Highlight
   */
  export type Document$HighlightArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    where?: HighlightWhereInput
    orderBy?: HighlightOrderByWithRelationInput | HighlightOrderByWithRelationInput[]
    cursor?: HighlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HighlightScalarFieldEnum | HighlightScalarFieldEnum[]
  }

  /**
   * Document.Chapters
   */
  export type Document$ChaptersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    where?: ChapterWhereInput
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[]
    cursor?: ChapterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentPreference
   */

  export type AggregateDocumentPreference = {
    _count: DocumentPreferenceCountAggregateOutputType | null
    _avg: DocumentPreferenceAvgAggregateOutputType | null
    _sum: DocumentPreferenceSumAggregateOutputType | null
    _min: DocumentPreferenceMinAggregateOutputType | null
    _max: DocumentPreferenceMaxAggregateOutputType | null
  }

  export type DocumentPreferenceAvgAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
  }

  export type DocumentPreferenceSumAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
  }

  export type DocumentPreferenceMinAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
    theme: string | null
    fontsize: string | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type DocumentPreferenceMaxAggregateOutputType = {
    id: number | null
    userid: number | null
    documentid: number | null
    theme: string | null
    fontsize: string | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type DocumentPreferenceCountAggregateOutputType = {
    id: number
    userid: number
    documentid: number
    theme: number
    fontsize: number
    notes: number
    createdat: number
    updatedat: number
    _all: number
  }


  export type DocumentPreferenceAvgAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
  }

  export type DocumentPreferenceSumAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
  }

  export type DocumentPreferenceMinAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    theme?: true
    fontsize?: true
    createdat?: true
    updatedat?: true
  }

  export type DocumentPreferenceMaxAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    theme?: true
    fontsize?: true
    createdat?: true
    updatedat?: true
  }

  export type DocumentPreferenceCountAggregateInputType = {
    id?: true
    userid?: true
    documentid?: true
    theme?: true
    fontsize?: true
    notes?: true
    createdat?: true
    updatedat?: true
    _all?: true
  }

  export type DocumentPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentPreference to aggregate.
     */
    where?: DocumentPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPreferences to fetch.
     */
    orderBy?: DocumentPreferenceOrderByWithRelationInput | DocumentPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentPreferences
    **/
    _count?: true | DocumentPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentPreferenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentPreferenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentPreferenceMaxAggregateInputType
  }

  export type GetDocumentPreferenceAggregateType<T extends DocumentPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentPreference[P]>
      : GetScalarType<T[P], AggregateDocumentPreference[P]>
  }




  export type DocumentPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPreferenceWhereInput
    orderBy?: DocumentPreferenceOrderByWithAggregationInput | DocumentPreferenceOrderByWithAggregationInput[]
    by: DocumentPreferenceScalarFieldEnum[] | DocumentPreferenceScalarFieldEnum
    having?: DocumentPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentPreferenceCountAggregateInputType | true
    _avg?: DocumentPreferenceAvgAggregateInputType
    _sum?: DocumentPreferenceSumAggregateInputType
    _min?: DocumentPreferenceMinAggregateInputType
    _max?: DocumentPreferenceMaxAggregateInputType
  }

  export type DocumentPreferenceGroupByOutputType = {
    id: number
    userid: number
    documentid: number
    theme: string
    fontsize: string
    notes: JsonValue
    createdat: Date
    updatedat: Date
    _count: DocumentPreferenceCountAggregateOutputType | null
    _avg: DocumentPreferenceAvgAggregateOutputType | null
    _sum: DocumentPreferenceSumAggregateOutputType | null
    _min: DocumentPreferenceMinAggregateOutputType | null
    _max: DocumentPreferenceMaxAggregateOutputType | null
  }

  type GetDocumentPreferenceGroupByPayload<T extends DocumentPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type DocumentPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userid?: boolean
    documentid?: boolean
    theme?: boolean
    fontsize?: boolean
    notes?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentPreference"]>

  export type DocumentPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userid?: boolean
    documentid?: boolean
    theme?: boolean
    fontsize?: boolean
    notes?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentPreference"]>

  export type DocumentPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userid?: boolean
    documentid?: boolean
    theme?: boolean
    fontsize?: boolean
    notes?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentPreference"]>

  export type DocumentPreferenceSelectScalar = {
    id?: boolean
    userid?: boolean
    documentid?: boolean
    theme?: boolean
    fontsize?: boolean
    notes?: boolean
    createdat?: boolean
    updatedat?: boolean
  }

  export type DocumentPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userid" | "documentid" | "theme" | "fontsize" | "notes" | "createdat" | "updatedat", ExtArgs["result"]["documentPreference"]>
  export type DocumentPreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DocumentPreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DocumentPreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DocumentPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentPreference"
    objects: {
      Document: Prisma.$DocumentPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userid: number
      documentid: number
      theme: string
      fontsize: string
      notes: Prisma.JsonValue
      createdat: Date
      updatedat: Date
    }, ExtArgs["result"]["documentPreference"]>
    composites: {}
  }

  type DocumentPreferenceGetPayload<S extends boolean | null | undefined | DocumentPreferenceDefaultArgs> = $Result.GetResult<Prisma.$DocumentPreferencePayload, S>

  type DocumentPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentPreferenceCountAggregateInputType | true
    }

  export interface DocumentPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentPreference'], meta: { name: 'DocumentPreference' } }
    /**
     * Find zero or one DocumentPreference that matches the filter.
     * @param {DocumentPreferenceFindUniqueArgs} args - Arguments to find a DocumentPreference
     * @example
     * // Get one DocumentPreference
     * const documentPreference = await prisma.documentPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentPreferenceFindUniqueArgs>(args: SelectSubset<T, DocumentPreferenceFindUniqueArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentPreferenceFindUniqueOrThrowArgs} args - Arguments to find a DocumentPreference
     * @example
     * // Get one DocumentPreference
     * const documentPreference = await prisma.documentPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPreferenceFindFirstArgs} args - Arguments to find a DocumentPreference
     * @example
     * // Get one DocumentPreference
     * const documentPreference = await prisma.documentPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentPreferenceFindFirstArgs>(args?: SelectSubset<T, DocumentPreferenceFindFirstArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPreferenceFindFirstOrThrowArgs} args - Arguments to find a DocumentPreference
     * @example
     * // Get one DocumentPreference
     * const documentPreference = await prisma.documentPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentPreferences
     * const documentPreferences = await prisma.documentPreference.findMany()
     * 
     * // Get first 10 DocumentPreferences
     * const documentPreferences = await prisma.documentPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentPreferenceWithIdOnly = await prisma.documentPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentPreferenceFindManyArgs>(args?: SelectSubset<T, DocumentPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentPreference.
     * @param {DocumentPreferenceCreateArgs} args - Arguments to create a DocumentPreference.
     * @example
     * // Create one DocumentPreference
     * const DocumentPreference = await prisma.documentPreference.create({
     *   data: {
     *     // ... data to create a DocumentPreference
     *   }
     * })
     * 
     */
    create<T extends DocumentPreferenceCreateArgs>(args: SelectSubset<T, DocumentPreferenceCreateArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentPreferences.
     * @param {DocumentPreferenceCreateManyArgs} args - Arguments to create many DocumentPreferences.
     * @example
     * // Create many DocumentPreferences
     * const documentPreference = await prisma.documentPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentPreferenceCreateManyArgs>(args?: SelectSubset<T, DocumentPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentPreferences and returns the data saved in the database.
     * @param {DocumentPreferenceCreateManyAndReturnArgs} args - Arguments to create many DocumentPreferences.
     * @example
     * // Create many DocumentPreferences
     * const documentPreference = await prisma.documentPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentPreferences and only return the `id`
     * const documentPreferenceWithIdOnly = await prisma.documentPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentPreference.
     * @param {DocumentPreferenceDeleteArgs} args - Arguments to delete one DocumentPreference.
     * @example
     * // Delete one DocumentPreference
     * const DocumentPreference = await prisma.documentPreference.delete({
     *   where: {
     *     // ... filter to delete one DocumentPreference
     *   }
     * })
     * 
     */
    delete<T extends DocumentPreferenceDeleteArgs>(args: SelectSubset<T, DocumentPreferenceDeleteArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentPreference.
     * @param {DocumentPreferenceUpdateArgs} args - Arguments to update one DocumentPreference.
     * @example
     * // Update one DocumentPreference
     * const documentPreference = await prisma.documentPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentPreferenceUpdateArgs>(args: SelectSubset<T, DocumentPreferenceUpdateArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentPreferences.
     * @param {DocumentPreferenceDeleteManyArgs} args - Arguments to filter DocumentPreferences to delete.
     * @example
     * // Delete a few DocumentPreferences
     * const { count } = await prisma.documentPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentPreferenceDeleteManyArgs>(args?: SelectSubset<T, DocumentPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentPreferences
     * const documentPreference = await prisma.documentPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentPreferenceUpdateManyArgs>(args: SelectSubset<T, DocumentPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentPreferences and returns the data updated in the database.
     * @param {DocumentPreferenceUpdateManyAndReturnArgs} args - Arguments to update many DocumentPreferences.
     * @example
     * // Update many DocumentPreferences
     * const documentPreference = await prisma.documentPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentPreferences and only return the `id`
     * const documentPreferenceWithIdOnly = await prisma.documentPreference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentPreference.
     * @param {DocumentPreferenceUpsertArgs} args - Arguments to update or create a DocumentPreference.
     * @example
     * // Update or create a DocumentPreference
     * const documentPreference = await prisma.documentPreference.upsert({
     *   create: {
     *     // ... data to create a DocumentPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentPreference we want to update
     *   }
     * })
     */
    upsert<T extends DocumentPreferenceUpsertArgs>(args: SelectSubset<T, DocumentPreferenceUpsertArgs<ExtArgs>>): Prisma__DocumentPreferenceClient<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPreferenceCountArgs} args - Arguments to filter DocumentPreferences to count.
     * @example
     * // Count the number of DocumentPreferences
     * const count = await prisma.documentPreference.count({
     *   where: {
     *     // ... the filter for the DocumentPreferences we want to count
     *   }
     * })
    **/
    count<T extends DocumentPreferenceCountArgs>(
      args?: Subset<T, DocumentPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentPreferenceAggregateArgs>(args: Subset<T, DocumentPreferenceAggregateArgs>): Prisma.PrismaPromise<GetDocumentPreferenceAggregateType<T>>

    /**
     * Group by DocumentPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: DocumentPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentPreference model
   */
  readonly fields: DocumentPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentPreference model
   */
  interface DocumentPreferenceFieldRefs {
    readonly id: FieldRef<"DocumentPreference", 'Int'>
    readonly userid: FieldRef<"DocumentPreference", 'Int'>
    readonly documentid: FieldRef<"DocumentPreference", 'Int'>
    readonly theme: FieldRef<"DocumentPreference", 'String'>
    readonly fontsize: FieldRef<"DocumentPreference", 'String'>
    readonly notes: FieldRef<"DocumentPreference", 'Json'>
    readonly createdat: FieldRef<"DocumentPreference", 'DateTime'>
    readonly updatedat: FieldRef<"DocumentPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentPreference findUnique
   */
  export type DocumentPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPreference to fetch.
     */
    where: DocumentPreferenceWhereUniqueInput
  }

  /**
   * DocumentPreference findUniqueOrThrow
   */
  export type DocumentPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPreference to fetch.
     */
    where: DocumentPreferenceWhereUniqueInput
  }

  /**
   * DocumentPreference findFirst
   */
  export type DocumentPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPreference to fetch.
     */
    where?: DocumentPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPreferences to fetch.
     */
    orderBy?: DocumentPreferenceOrderByWithRelationInput | DocumentPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentPreferences.
     */
    cursor?: DocumentPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentPreferences.
     */
    distinct?: DocumentPreferenceScalarFieldEnum | DocumentPreferenceScalarFieldEnum[]
  }

  /**
   * DocumentPreference findFirstOrThrow
   */
  export type DocumentPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPreference to fetch.
     */
    where?: DocumentPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPreferences to fetch.
     */
    orderBy?: DocumentPreferenceOrderByWithRelationInput | DocumentPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentPreferences.
     */
    cursor?: DocumentPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentPreferences.
     */
    distinct?: DocumentPreferenceScalarFieldEnum | DocumentPreferenceScalarFieldEnum[]
  }

  /**
   * DocumentPreference findMany
   */
  export type DocumentPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPreferences to fetch.
     */
    where?: DocumentPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPreferences to fetch.
     */
    orderBy?: DocumentPreferenceOrderByWithRelationInput | DocumentPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentPreferences.
     */
    cursor?: DocumentPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPreferences.
     */
    skip?: number
    distinct?: DocumentPreferenceScalarFieldEnum | DocumentPreferenceScalarFieldEnum[]
  }

  /**
   * DocumentPreference create
   */
  export type DocumentPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentPreference.
     */
    data: XOR<DocumentPreferenceCreateInput, DocumentPreferenceUncheckedCreateInput>
  }

  /**
   * DocumentPreference createMany
   */
  export type DocumentPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentPreferences.
     */
    data: DocumentPreferenceCreateManyInput | DocumentPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentPreference createManyAndReturn
   */
  export type DocumentPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentPreferences.
     */
    data: DocumentPreferenceCreateManyInput | DocumentPreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentPreference update
   */
  export type DocumentPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentPreference.
     */
    data: XOR<DocumentPreferenceUpdateInput, DocumentPreferenceUncheckedUpdateInput>
    /**
     * Choose, which DocumentPreference to update.
     */
    where: DocumentPreferenceWhereUniqueInput
  }

  /**
   * DocumentPreference updateMany
   */
  export type DocumentPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentPreferences.
     */
    data: XOR<DocumentPreferenceUpdateManyMutationInput, DocumentPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which DocumentPreferences to update
     */
    where?: DocumentPreferenceWhereInput
    /**
     * Limit how many DocumentPreferences to update.
     */
    limit?: number
  }

  /**
   * DocumentPreference updateManyAndReturn
   */
  export type DocumentPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update DocumentPreferences.
     */
    data: XOR<DocumentPreferenceUpdateManyMutationInput, DocumentPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which DocumentPreferences to update
     */
    where?: DocumentPreferenceWhereInput
    /**
     * Limit how many DocumentPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentPreference upsert
   */
  export type DocumentPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentPreference to update in case it exists.
     */
    where: DocumentPreferenceWhereUniqueInput
    /**
     * In case the DocumentPreference found by the `where` argument doesn't exist, create a new DocumentPreference with this data.
     */
    create: XOR<DocumentPreferenceCreateInput, DocumentPreferenceUncheckedCreateInput>
    /**
     * In case the DocumentPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentPreferenceUpdateInput, DocumentPreferenceUncheckedUpdateInput>
  }

  /**
   * DocumentPreference delete
   */
  export type DocumentPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    /**
     * Filter which DocumentPreference to delete.
     */
    where: DocumentPreferenceWhereUniqueInput
  }

  /**
   * DocumentPreference deleteMany
   */
  export type DocumentPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentPreferences to delete
     */
    where?: DocumentPreferenceWhereInput
    /**
     * Limit how many DocumentPreferences to delete.
     */
    limit?: number
  }

  /**
   * DocumentPreference without action
   */
  export type DocumentPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
  }


  /**
   * Model Highlight
   */

  export type AggregateHighlight = {
    _count: HighlightCountAggregateOutputType | null
    _avg: HighlightAvgAggregateOutputType | null
    _sum: HighlightSumAggregateOutputType | null
    _min: HighlightMinAggregateOutputType | null
    _max: HighlightMaxAggregateOutputType | null
  }

  export type HighlightAvgAggregateOutputType = {
    id: number | null
    documentid: number | null
    userid: number | null
    pagenumber: number | null
  }

  export type HighlightSumAggregateOutputType = {
    id: number | null
    documentid: number | null
    userid: number | null
    pagenumber: number | null
  }

  export type HighlightMinAggregateOutputType = {
    id: number | null
    documentid: number | null
    userid: number | null
    text: string | null
    color: string | null
    pagenumber: number | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type HighlightMaxAggregateOutputType = {
    id: number | null
    documentid: number | null
    userid: number | null
    text: string | null
    color: string | null
    pagenumber: number | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type HighlightCountAggregateOutputType = {
    id: number
    documentid: number
    userid: number
    text: number
    color: number
    pagenumber: number
    coordinates: number
    createdat: number
    updatedat: number
    _all: number
  }


  export type HighlightAvgAggregateInputType = {
    id?: true
    documentid?: true
    userid?: true
    pagenumber?: true
  }

  export type HighlightSumAggregateInputType = {
    id?: true
    documentid?: true
    userid?: true
    pagenumber?: true
  }

  export type HighlightMinAggregateInputType = {
    id?: true
    documentid?: true
    userid?: true
    text?: true
    color?: true
    pagenumber?: true
    createdat?: true
    updatedat?: true
  }

  export type HighlightMaxAggregateInputType = {
    id?: true
    documentid?: true
    userid?: true
    text?: true
    color?: true
    pagenumber?: true
    createdat?: true
    updatedat?: true
  }

  export type HighlightCountAggregateInputType = {
    id?: true
    documentid?: true
    userid?: true
    text?: true
    color?: true
    pagenumber?: true
    coordinates?: true
    createdat?: true
    updatedat?: true
    _all?: true
  }

  export type HighlightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Highlight to aggregate.
     */
    where?: HighlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Highlights to fetch.
     */
    orderBy?: HighlightOrderByWithRelationInput | HighlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HighlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Highlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Highlights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Highlights
    **/
    _count?: true | HighlightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HighlightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HighlightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HighlightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HighlightMaxAggregateInputType
  }

  export type GetHighlightAggregateType<T extends HighlightAggregateArgs> = {
        [P in keyof T & keyof AggregateHighlight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHighlight[P]>
      : GetScalarType<T[P], AggregateHighlight[P]>
  }




  export type HighlightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HighlightWhereInput
    orderBy?: HighlightOrderByWithAggregationInput | HighlightOrderByWithAggregationInput[]
    by: HighlightScalarFieldEnum[] | HighlightScalarFieldEnum
    having?: HighlightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HighlightCountAggregateInputType | true
    _avg?: HighlightAvgAggregateInputType
    _sum?: HighlightSumAggregateInputType
    _min?: HighlightMinAggregateInputType
    _max?: HighlightMaxAggregateInputType
  }

  export type HighlightGroupByOutputType = {
    id: number
    documentid: number
    userid: number
    text: string
    color: string
    pagenumber: number
    coordinates: JsonValue
    createdat: Date
    updatedat: Date
    _count: HighlightCountAggregateOutputType | null
    _avg: HighlightAvgAggregateOutputType | null
    _sum: HighlightSumAggregateOutputType | null
    _min: HighlightMinAggregateOutputType | null
    _max: HighlightMaxAggregateOutputType | null
  }

  type GetHighlightGroupByPayload<T extends HighlightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HighlightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HighlightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HighlightGroupByOutputType[P]>
            : GetScalarType<T[P], HighlightGroupByOutputType[P]>
        }
      >
    >


  export type HighlightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentid?: boolean
    userid?: boolean
    text?: boolean
    color?: boolean
    pagenumber?: boolean
    coordinates?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["highlight"]>

  export type HighlightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentid?: boolean
    userid?: boolean
    text?: boolean
    color?: boolean
    pagenumber?: boolean
    coordinates?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["highlight"]>

  export type HighlightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentid?: boolean
    userid?: boolean
    text?: boolean
    color?: boolean
    pagenumber?: boolean
    coordinates?: boolean
    createdat?: boolean
    updatedat?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["highlight"]>

  export type HighlightSelectScalar = {
    id?: boolean
    documentid?: boolean
    userid?: boolean
    text?: boolean
    color?: boolean
    pagenumber?: boolean
    coordinates?: boolean
    createdat?: boolean
    updatedat?: boolean
  }

  export type HighlightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentid" | "userid" | "text" | "color" | "pagenumber" | "coordinates" | "createdat" | "updatedat", ExtArgs["result"]["highlight"]>
  export type HighlightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HighlightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HighlightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HighlightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Highlight"
    objects: {
      Document: Prisma.$DocumentPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      documentid: number
      userid: number
      text: string
      color: string
      pagenumber: number
      coordinates: Prisma.JsonValue
      createdat: Date
      updatedat: Date
    }, ExtArgs["result"]["highlight"]>
    composites: {}
  }

  type HighlightGetPayload<S extends boolean | null | undefined | HighlightDefaultArgs> = $Result.GetResult<Prisma.$HighlightPayload, S>

  type HighlightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HighlightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HighlightCountAggregateInputType | true
    }

  export interface HighlightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Highlight'], meta: { name: 'Highlight' } }
    /**
     * Find zero or one Highlight that matches the filter.
     * @param {HighlightFindUniqueArgs} args - Arguments to find a Highlight
     * @example
     * // Get one Highlight
     * const highlight = await prisma.highlight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HighlightFindUniqueArgs>(args: SelectSubset<T, HighlightFindUniqueArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Highlight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HighlightFindUniqueOrThrowArgs} args - Arguments to find a Highlight
     * @example
     * // Get one Highlight
     * const highlight = await prisma.highlight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HighlightFindUniqueOrThrowArgs>(args: SelectSubset<T, HighlightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Highlight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HighlightFindFirstArgs} args - Arguments to find a Highlight
     * @example
     * // Get one Highlight
     * const highlight = await prisma.highlight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HighlightFindFirstArgs>(args?: SelectSubset<T, HighlightFindFirstArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Highlight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HighlightFindFirstOrThrowArgs} args - Arguments to find a Highlight
     * @example
     * // Get one Highlight
     * const highlight = await prisma.highlight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HighlightFindFirstOrThrowArgs>(args?: SelectSubset<T, HighlightFindFirstOrThrowArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Highlights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HighlightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Highlights
     * const highlights = await prisma.highlight.findMany()
     * 
     * // Get first 10 Highlights
     * const highlights = await prisma.highlight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const highlightWithIdOnly = await prisma.highlight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HighlightFindManyArgs>(args?: SelectSubset<T, HighlightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Highlight.
     * @param {HighlightCreateArgs} args - Arguments to create a Highlight.
     * @example
     * // Create one Highlight
     * const Highlight = await prisma.highlight.create({
     *   data: {
     *     // ... data to create a Highlight
     *   }
     * })
     * 
     */
    create<T extends HighlightCreateArgs>(args: SelectSubset<T, HighlightCreateArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Highlights.
     * @param {HighlightCreateManyArgs} args - Arguments to create many Highlights.
     * @example
     * // Create many Highlights
     * const highlight = await prisma.highlight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HighlightCreateManyArgs>(args?: SelectSubset<T, HighlightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Highlights and returns the data saved in the database.
     * @param {HighlightCreateManyAndReturnArgs} args - Arguments to create many Highlights.
     * @example
     * // Create many Highlights
     * const highlight = await prisma.highlight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Highlights and only return the `id`
     * const highlightWithIdOnly = await prisma.highlight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HighlightCreateManyAndReturnArgs>(args?: SelectSubset<T, HighlightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Highlight.
     * @param {HighlightDeleteArgs} args - Arguments to delete one Highlight.
     * @example
     * // Delete one Highlight
     * const Highlight = await prisma.highlight.delete({
     *   where: {
     *     // ... filter to delete one Highlight
     *   }
     * })
     * 
     */
    delete<T extends HighlightDeleteArgs>(args: SelectSubset<T, HighlightDeleteArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Highlight.
     * @param {HighlightUpdateArgs} args - Arguments to update one Highlight.
     * @example
     * // Update one Highlight
     * const highlight = await prisma.highlight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HighlightUpdateArgs>(args: SelectSubset<T, HighlightUpdateArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Highlights.
     * @param {HighlightDeleteManyArgs} args - Arguments to filter Highlights to delete.
     * @example
     * // Delete a few Highlights
     * const { count } = await prisma.highlight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HighlightDeleteManyArgs>(args?: SelectSubset<T, HighlightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Highlights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HighlightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Highlights
     * const highlight = await prisma.highlight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HighlightUpdateManyArgs>(args: SelectSubset<T, HighlightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Highlights and returns the data updated in the database.
     * @param {HighlightUpdateManyAndReturnArgs} args - Arguments to update many Highlights.
     * @example
     * // Update many Highlights
     * const highlight = await prisma.highlight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Highlights and only return the `id`
     * const highlightWithIdOnly = await prisma.highlight.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HighlightUpdateManyAndReturnArgs>(args: SelectSubset<T, HighlightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Highlight.
     * @param {HighlightUpsertArgs} args - Arguments to update or create a Highlight.
     * @example
     * // Update or create a Highlight
     * const highlight = await prisma.highlight.upsert({
     *   create: {
     *     // ... data to create a Highlight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Highlight we want to update
     *   }
     * })
     */
    upsert<T extends HighlightUpsertArgs>(args: SelectSubset<T, HighlightUpsertArgs<ExtArgs>>): Prisma__HighlightClient<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Highlights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HighlightCountArgs} args - Arguments to filter Highlights to count.
     * @example
     * // Count the number of Highlights
     * const count = await prisma.highlight.count({
     *   where: {
     *     // ... the filter for the Highlights we want to count
     *   }
     * })
    **/
    count<T extends HighlightCountArgs>(
      args?: Subset<T, HighlightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HighlightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Highlight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HighlightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HighlightAggregateArgs>(args: Subset<T, HighlightAggregateArgs>): Prisma.PrismaPromise<GetHighlightAggregateType<T>>

    /**
     * Group by Highlight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HighlightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HighlightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HighlightGroupByArgs['orderBy'] }
        : { orderBy?: HighlightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HighlightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHighlightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Highlight model
   */
  readonly fields: HighlightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Highlight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HighlightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Highlight model
   */
  interface HighlightFieldRefs {
    readonly id: FieldRef<"Highlight", 'Int'>
    readonly documentid: FieldRef<"Highlight", 'Int'>
    readonly userid: FieldRef<"Highlight", 'Int'>
    readonly text: FieldRef<"Highlight", 'String'>
    readonly color: FieldRef<"Highlight", 'String'>
    readonly pagenumber: FieldRef<"Highlight", 'Int'>
    readonly coordinates: FieldRef<"Highlight", 'Json'>
    readonly createdat: FieldRef<"Highlight", 'DateTime'>
    readonly updatedat: FieldRef<"Highlight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Highlight findUnique
   */
  export type HighlightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * Filter, which Highlight to fetch.
     */
    where: HighlightWhereUniqueInput
  }

  /**
   * Highlight findUniqueOrThrow
   */
  export type HighlightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * Filter, which Highlight to fetch.
     */
    where: HighlightWhereUniqueInput
  }

  /**
   * Highlight findFirst
   */
  export type HighlightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * Filter, which Highlight to fetch.
     */
    where?: HighlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Highlights to fetch.
     */
    orderBy?: HighlightOrderByWithRelationInput | HighlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Highlights.
     */
    cursor?: HighlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Highlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Highlights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Highlights.
     */
    distinct?: HighlightScalarFieldEnum | HighlightScalarFieldEnum[]
  }

  /**
   * Highlight findFirstOrThrow
   */
  export type HighlightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * Filter, which Highlight to fetch.
     */
    where?: HighlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Highlights to fetch.
     */
    orderBy?: HighlightOrderByWithRelationInput | HighlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Highlights.
     */
    cursor?: HighlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Highlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Highlights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Highlights.
     */
    distinct?: HighlightScalarFieldEnum | HighlightScalarFieldEnum[]
  }

  /**
   * Highlight findMany
   */
  export type HighlightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * Filter, which Highlights to fetch.
     */
    where?: HighlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Highlights to fetch.
     */
    orderBy?: HighlightOrderByWithRelationInput | HighlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Highlights.
     */
    cursor?: HighlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Highlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Highlights.
     */
    skip?: number
    distinct?: HighlightScalarFieldEnum | HighlightScalarFieldEnum[]
  }

  /**
   * Highlight create
   */
  export type HighlightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * The data needed to create a Highlight.
     */
    data: XOR<HighlightCreateInput, HighlightUncheckedCreateInput>
  }

  /**
   * Highlight createMany
   */
  export type HighlightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Highlights.
     */
    data: HighlightCreateManyInput | HighlightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Highlight createManyAndReturn
   */
  export type HighlightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * The data used to create many Highlights.
     */
    data: HighlightCreateManyInput | HighlightCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Highlight update
   */
  export type HighlightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * The data needed to update a Highlight.
     */
    data: XOR<HighlightUpdateInput, HighlightUncheckedUpdateInput>
    /**
     * Choose, which Highlight to update.
     */
    where: HighlightWhereUniqueInput
  }

  /**
   * Highlight updateMany
   */
  export type HighlightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Highlights.
     */
    data: XOR<HighlightUpdateManyMutationInput, HighlightUncheckedUpdateManyInput>
    /**
     * Filter which Highlights to update
     */
    where?: HighlightWhereInput
    /**
     * Limit how many Highlights to update.
     */
    limit?: number
  }

  /**
   * Highlight updateManyAndReturn
   */
  export type HighlightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * The data used to update Highlights.
     */
    data: XOR<HighlightUpdateManyMutationInput, HighlightUncheckedUpdateManyInput>
    /**
     * Filter which Highlights to update
     */
    where?: HighlightWhereInput
    /**
     * Limit how many Highlights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Highlight upsert
   */
  export type HighlightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * The filter to search for the Highlight to update in case it exists.
     */
    where: HighlightWhereUniqueInput
    /**
     * In case the Highlight found by the `where` argument doesn't exist, create a new Highlight with this data.
     */
    create: XOR<HighlightCreateInput, HighlightUncheckedCreateInput>
    /**
     * In case the Highlight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HighlightUpdateInput, HighlightUncheckedUpdateInput>
  }

  /**
   * Highlight delete
   */
  export type HighlightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    /**
     * Filter which Highlight to delete.
     */
    where: HighlightWhereUniqueInput
  }

  /**
   * Highlight deleteMany
   */
  export type HighlightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Highlights to delete
     */
    where?: HighlightWhereInput
    /**
     * Limit how many Highlights to delete.
     */
    limit?: number
  }

  /**
   * Highlight without action
   */
  export type HighlightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordhash: string | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordhash: string | null
    createdat: Date | null
    updatedat: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordhash: number
    createdat: number
    updatedat: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordhash?: true
    createdat?: true
    updatedat?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordhash?: true
    createdat?: true
    updatedat?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordhash?: true
    createdat?: true
    updatedat?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    passwordhash: string | null
    createdat: Date
    updatedat: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordhash?: boolean
    createdat?: boolean
    updatedat?: boolean
    Analytics?: boolean | User$AnalyticsArgs<ExtArgs>
    Document?: boolean | User$DocumentArgs<ExtArgs>
    DocumentPreference?: boolean | User$DocumentPreferenceArgs<ExtArgs>
    Highlight?: boolean | User$HighlightArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordhash?: boolean
    createdat?: boolean
    updatedat?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordhash?: boolean
    createdat?: boolean
    updatedat?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordhash?: boolean
    createdat?: boolean
    updatedat?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordhash" | "createdat" | "updatedat", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Analytics?: boolean | User$AnalyticsArgs<ExtArgs>
    Document?: boolean | User$DocumentArgs<ExtArgs>
    DocumentPreference?: boolean | User$DocumentPreferenceArgs<ExtArgs>
    Highlight?: boolean | User$HighlightArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Analytics: Prisma.$AnalyticsPayload<ExtArgs>[]
      Document: Prisma.$DocumentPayload<ExtArgs>[]
      DocumentPreference: Prisma.$DocumentPreferencePayload<ExtArgs>[]
      Highlight: Prisma.$HighlightPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      passwordhash: string | null
      createdat: Date
      updatedat: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Analytics<T extends User$AnalyticsArgs<ExtArgs> = {}>(args?: Subset<T, User$AnalyticsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Document<T extends User$DocumentArgs<ExtArgs> = {}>(args?: Subset<T, User$DocumentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    DocumentPreference<T extends User$DocumentPreferenceArgs<ExtArgs> = {}>(args?: Subset<T, User$DocumentPreferenceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Highlight<T extends User$HighlightArgs<ExtArgs> = {}>(args?: Subset<T, User$HighlightArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HighlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordhash: FieldRef<"User", 'String'>
    readonly createdat: FieldRef<"User", 'DateTime'>
    readonly updatedat: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Analytics
   */
  export type User$AnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsInclude<ExtArgs> | null
    where?: AnalyticsWhereInput
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    cursor?: AnalyticsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * User.Document
   */
  export type User$DocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * User.DocumentPreference
   */
  export type User$DocumentPreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPreference
     */
    select?: DocumentPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPreference
     */
    omit?: DocumentPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPreferenceInclude<ExtArgs> | null
    where?: DocumentPreferenceWhereInput
    orderBy?: DocumentPreferenceOrderByWithRelationInput | DocumentPreferenceOrderByWithRelationInput[]
    cursor?: DocumentPreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentPreferenceScalarFieldEnum | DocumentPreferenceScalarFieldEnum[]
  }

  /**
   * User.Highlight
   */
  export type User$HighlightArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Highlight
     */
    select?: HighlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Highlight
     */
    omit?: HighlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HighlightInclude<ExtArgs> | null
    where?: HighlightWhereInput
    orderBy?: HighlightOrderByWithRelationInput | HighlightOrderByWithRelationInput[]
    cursor?: HighlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HighlightScalarFieldEnum | HighlightScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Chapter
   */

  export type AggregateChapter = {
    _count: ChapterCountAggregateOutputType | null
    _avg: ChapterAvgAggregateOutputType | null
    _sum: ChapterSumAggregateOutputType | null
    _min: ChapterMinAggregateOutputType | null
    _max: ChapterMaxAggregateOutputType | null
  }

  export type ChapterAvgAggregateOutputType = {
    id: number | null
    documentId: number | null
    startPage: number | null
    endPage: number | null
  }

  export type ChapterSumAggregateOutputType = {
    id: number | null
    documentId: number | null
    startPage: number | null
    endPage: number | null
  }

  export type ChapterMinAggregateOutputType = {
    id: number | null
    documentId: number | null
    title: string | null
    startPage: number | null
    endPage: number | null
    pdfPath: string | null
    htmlPath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChapterMaxAggregateOutputType = {
    id: number | null
    documentId: number | null
    title: string | null
    startPage: number | null
    endPage: number | null
    pdfPath: string | null
    htmlPath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChapterCountAggregateOutputType = {
    id: number
    documentId: number
    title: number
    startPage: number
    endPage: number
    pdfPath: number
    htmlPath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChapterAvgAggregateInputType = {
    id?: true
    documentId?: true
    startPage?: true
    endPage?: true
  }

  export type ChapterSumAggregateInputType = {
    id?: true
    documentId?: true
    startPage?: true
    endPage?: true
  }

  export type ChapterMinAggregateInputType = {
    id?: true
    documentId?: true
    title?: true
    startPage?: true
    endPage?: true
    pdfPath?: true
    htmlPath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChapterMaxAggregateInputType = {
    id?: true
    documentId?: true
    title?: true
    startPage?: true
    endPage?: true
    pdfPath?: true
    htmlPath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChapterCountAggregateInputType = {
    id?: true
    documentId?: true
    title?: true
    startPage?: true
    endPage?: true
    pdfPath?: true
    htmlPath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChapterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chapter to aggregate.
     */
    where?: ChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chapters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chapters
    **/
    _count?: true | ChapterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChapterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChapterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChapterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChapterMaxAggregateInputType
  }

  export type GetChapterAggregateType<T extends ChapterAggregateArgs> = {
        [P in keyof T & keyof AggregateChapter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChapter[P]>
      : GetScalarType<T[P], AggregateChapter[P]>
  }




  export type ChapterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChapterWhereInput
    orderBy?: ChapterOrderByWithAggregationInput | ChapterOrderByWithAggregationInput[]
    by: ChapterScalarFieldEnum[] | ChapterScalarFieldEnum
    having?: ChapterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChapterCountAggregateInputType | true
    _avg?: ChapterAvgAggregateInputType
    _sum?: ChapterSumAggregateInputType
    _min?: ChapterMinAggregateInputType
    _max?: ChapterMaxAggregateInputType
  }

  export type ChapterGroupByOutputType = {
    id: number
    documentId: number
    title: string
    startPage: number
    endPage: number
    pdfPath: string
    htmlPath: string
    createdAt: Date
    updatedAt: Date
    _count: ChapterCountAggregateOutputType | null
    _avg: ChapterAvgAggregateOutputType | null
    _sum: ChapterSumAggregateOutputType | null
    _min: ChapterMinAggregateOutputType | null
    _max: ChapterMaxAggregateOutputType | null
  }

  type GetChapterGroupByPayload<T extends ChapterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChapterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChapterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChapterGroupByOutputType[P]>
            : GetScalarType<T[P], ChapterGroupByOutputType[P]>
        }
      >
    >


  export type ChapterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    title?: boolean
    startPage?: boolean
    endPage?: boolean
    pdfPath?: boolean
    htmlPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chapter"]>

  export type ChapterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    title?: boolean
    startPage?: boolean
    endPage?: boolean
    pdfPath?: boolean
    htmlPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chapter"]>

  export type ChapterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    title?: boolean
    startPage?: boolean
    endPage?: boolean
    pdfPath?: boolean
    htmlPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chapter"]>

  export type ChapterSelectScalar = {
    id?: boolean
    documentId?: boolean
    title?: boolean
    startPage?: boolean
    endPage?: boolean
    pdfPath?: boolean
    htmlPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChapterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "title" | "startPage" | "endPage" | "pdfPath" | "htmlPath" | "createdAt" | "updatedAt", ExtArgs["result"]["chapter"]>
  export type ChapterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type ChapterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type ChapterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $ChapterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chapter"
    objects: {
      Document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      documentId: number
      title: string
      startPage: number
      endPage: number
      pdfPath: string
      htmlPath: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chapter"]>
    composites: {}
  }

  type ChapterGetPayload<S extends boolean | null | undefined | ChapterDefaultArgs> = $Result.GetResult<Prisma.$ChapterPayload, S>

  type ChapterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChapterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChapterCountAggregateInputType | true
    }

  export interface ChapterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chapter'], meta: { name: 'Chapter' } }
    /**
     * Find zero or one Chapter that matches the filter.
     * @param {ChapterFindUniqueArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChapterFindUniqueArgs>(args: SelectSubset<T, ChapterFindUniqueArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chapter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChapterFindUniqueOrThrowArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChapterFindUniqueOrThrowArgs>(args: SelectSubset<T, ChapterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chapter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterFindFirstArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChapterFindFirstArgs>(args?: SelectSubset<T, ChapterFindFirstArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chapter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterFindFirstOrThrowArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChapterFindFirstOrThrowArgs>(args?: SelectSubset<T, ChapterFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chapters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chapters
     * const chapters = await prisma.chapter.findMany()
     * 
     * // Get first 10 Chapters
     * const chapters = await prisma.chapter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chapterWithIdOnly = await prisma.chapter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChapterFindManyArgs>(args?: SelectSubset<T, ChapterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chapter.
     * @param {ChapterCreateArgs} args - Arguments to create a Chapter.
     * @example
     * // Create one Chapter
     * const Chapter = await prisma.chapter.create({
     *   data: {
     *     // ... data to create a Chapter
     *   }
     * })
     * 
     */
    create<T extends ChapterCreateArgs>(args: SelectSubset<T, ChapterCreateArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chapters.
     * @param {ChapterCreateManyArgs} args - Arguments to create many Chapters.
     * @example
     * // Create many Chapters
     * const chapter = await prisma.chapter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChapterCreateManyArgs>(args?: SelectSubset<T, ChapterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chapters and returns the data saved in the database.
     * @param {ChapterCreateManyAndReturnArgs} args - Arguments to create many Chapters.
     * @example
     * // Create many Chapters
     * const chapter = await prisma.chapter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chapters and only return the `id`
     * const chapterWithIdOnly = await prisma.chapter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChapterCreateManyAndReturnArgs>(args?: SelectSubset<T, ChapterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chapter.
     * @param {ChapterDeleteArgs} args - Arguments to delete one Chapter.
     * @example
     * // Delete one Chapter
     * const Chapter = await prisma.chapter.delete({
     *   where: {
     *     // ... filter to delete one Chapter
     *   }
     * })
     * 
     */
    delete<T extends ChapterDeleteArgs>(args: SelectSubset<T, ChapterDeleteArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chapter.
     * @param {ChapterUpdateArgs} args - Arguments to update one Chapter.
     * @example
     * // Update one Chapter
     * const chapter = await prisma.chapter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChapterUpdateArgs>(args: SelectSubset<T, ChapterUpdateArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chapters.
     * @param {ChapterDeleteManyArgs} args - Arguments to filter Chapters to delete.
     * @example
     * // Delete a few Chapters
     * const { count } = await prisma.chapter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChapterDeleteManyArgs>(args?: SelectSubset<T, ChapterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chapters
     * const chapter = await prisma.chapter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChapterUpdateManyArgs>(args: SelectSubset<T, ChapterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chapters and returns the data updated in the database.
     * @param {ChapterUpdateManyAndReturnArgs} args - Arguments to update many Chapters.
     * @example
     * // Update many Chapters
     * const chapter = await prisma.chapter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chapters and only return the `id`
     * const chapterWithIdOnly = await prisma.chapter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChapterUpdateManyAndReturnArgs>(args: SelectSubset<T, ChapterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chapter.
     * @param {ChapterUpsertArgs} args - Arguments to update or create a Chapter.
     * @example
     * // Update or create a Chapter
     * const chapter = await prisma.chapter.upsert({
     *   create: {
     *     // ... data to create a Chapter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chapter we want to update
     *   }
     * })
     */
    upsert<T extends ChapterUpsertArgs>(args: SelectSubset<T, ChapterUpsertArgs<ExtArgs>>): Prisma__ChapterClient<$Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterCountArgs} args - Arguments to filter Chapters to count.
     * @example
     * // Count the number of Chapters
     * const count = await prisma.chapter.count({
     *   where: {
     *     // ... the filter for the Chapters we want to count
     *   }
     * })
    **/
    count<T extends ChapterCountArgs>(
      args?: Subset<T, ChapterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChapterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChapterAggregateArgs>(args: Subset<T, ChapterAggregateArgs>): Prisma.PrismaPromise<GetChapterAggregateType<T>>

    /**
     * Group by Chapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChapterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChapterGroupByArgs['orderBy'] }
        : { orderBy?: ChapterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChapterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChapterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chapter model
   */
  readonly fields: ChapterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chapter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChapterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chapter model
   */
  interface ChapterFieldRefs {
    readonly id: FieldRef<"Chapter", 'Int'>
    readonly documentId: FieldRef<"Chapter", 'Int'>
    readonly title: FieldRef<"Chapter", 'String'>
    readonly startPage: FieldRef<"Chapter", 'Int'>
    readonly endPage: FieldRef<"Chapter", 'Int'>
    readonly pdfPath: FieldRef<"Chapter", 'String'>
    readonly htmlPath: FieldRef<"Chapter", 'String'>
    readonly createdAt: FieldRef<"Chapter", 'DateTime'>
    readonly updatedAt: FieldRef<"Chapter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chapter findUnique
   */
  export type ChapterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * Filter, which Chapter to fetch.
     */
    where: ChapterWhereUniqueInput
  }

  /**
   * Chapter findUniqueOrThrow
   */
  export type ChapterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * Filter, which Chapter to fetch.
     */
    where: ChapterWhereUniqueInput
  }

  /**
   * Chapter findFirst
   */
  export type ChapterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * Filter, which Chapter to fetch.
     */
    where?: ChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chapters.
     */
    cursor?: ChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chapters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chapters.
     */
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[]
  }

  /**
   * Chapter findFirstOrThrow
   */
  export type ChapterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * Filter, which Chapter to fetch.
     */
    where?: ChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chapters.
     */
    cursor?: ChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chapters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chapters.
     */
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[]
  }

  /**
   * Chapter findMany
   */
  export type ChapterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * Filter, which Chapters to fetch.
     */
    where?: ChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chapters.
     */
    cursor?: ChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chapters.
     */
    skip?: number
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[]
  }

  /**
   * Chapter create
   */
  export type ChapterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * The data needed to create a Chapter.
     */
    data: XOR<ChapterCreateInput, ChapterUncheckedCreateInput>
  }

  /**
   * Chapter createMany
   */
  export type ChapterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chapters.
     */
    data: ChapterCreateManyInput | ChapterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chapter createManyAndReturn
   */
  export type ChapterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * The data used to create many Chapters.
     */
    data: ChapterCreateManyInput | ChapterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chapter update
   */
  export type ChapterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * The data needed to update a Chapter.
     */
    data: XOR<ChapterUpdateInput, ChapterUncheckedUpdateInput>
    /**
     * Choose, which Chapter to update.
     */
    where: ChapterWhereUniqueInput
  }

  /**
   * Chapter updateMany
   */
  export type ChapterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chapters.
     */
    data: XOR<ChapterUpdateManyMutationInput, ChapterUncheckedUpdateManyInput>
    /**
     * Filter which Chapters to update
     */
    where?: ChapterWhereInput
    /**
     * Limit how many Chapters to update.
     */
    limit?: number
  }

  /**
   * Chapter updateManyAndReturn
   */
  export type ChapterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * The data used to update Chapters.
     */
    data: XOR<ChapterUpdateManyMutationInput, ChapterUncheckedUpdateManyInput>
    /**
     * Filter which Chapters to update
     */
    where?: ChapterWhereInput
    /**
     * Limit how many Chapters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chapter upsert
   */
  export type ChapterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * The filter to search for the Chapter to update in case it exists.
     */
    where: ChapterWhereUniqueInput
    /**
     * In case the Chapter found by the `where` argument doesn't exist, create a new Chapter with this data.
     */
    create: XOR<ChapterCreateInput, ChapterUncheckedCreateInput>
    /**
     * In case the Chapter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChapterUpdateInput, ChapterUncheckedUpdateInput>
  }

  /**
   * Chapter delete
   */
  export type ChapterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
    /**
     * Filter which Chapter to delete.
     */
    where: ChapterWhereUniqueInput
  }

  /**
   * Chapter deleteMany
   */
  export type ChapterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chapters to delete
     */
    where?: ChapterWhereInput
    /**
     * Limit how many Chapters to delete.
     */
    limit?: number
  }

  /**
   * Chapter without action
   */
  export type ChapterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AnalyticsScalarFieldEnum: {
    id: 'id',
    userid: 'userid',
    documentid: 'documentid',
    starttime: 'starttime',
    endtime: 'endtime',
    duration: 'duration',
    createdat: 'createdat',
    updatedat: 'updatedat'
  };

  export type AnalyticsScalarFieldEnum = (typeof AnalyticsScalarFieldEnum)[keyof typeof AnalyticsScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    description: 'description',
    coverurl: 'coverurl',
    filepath: 'filepath',
    filehash: 'filehash',
    uploadedbyid: 'uploadedbyid',
    tableofcontents: 'tableofcontents',
    progress: 'progress',
    lastopened: 'lastopened',
    createdat: 'createdat',
    updatedat: 'updatedat'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentPreferenceScalarFieldEnum: {
    id: 'id',
    userid: 'userid',
    documentid: 'documentid',
    theme: 'theme',
    fontsize: 'fontsize',
    notes: 'notes',
    createdat: 'createdat',
    updatedat: 'updatedat'
  };

  export type DocumentPreferenceScalarFieldEnum = (typeof DocumentPreferenceScalarFieldEnum)[keyof typeof DocumentPreferenceScalarFieldEnum]


  export const HighlightScalarFieldEnum: {
    id: 'id',
    documentid: 'documentid',
    userid: 'userid',
    text: 'text',
    color: 'color',
    pagenumber: 'pagenumber',
    coordinates: 'coordinates',
    createdat: 'createdat',
    updatedat: 'updatedat'
  };

  export type HighlightScalarFieldEnum = (typeof HighlightScalarFieldEnum)[keyof typeof HighlightScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordhash: 'passwordhash',
    createdat: 'createdat',
    updatedat: 'updatedat'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ChapterScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    title: 'title',
    startPage: 'startPage',
    endPage: 'endPage',
    pdfPath: 'pdfPath',
    htmlPath: 'htmlPath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChapterScalarFieldEnum = (typeof ChapterScalarFieldEnum)[keyof typeof ChapterScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AnalyticsWhereInput = {
    AND?: AnalyticsWhereInput | AnalyticsWhereInput[]
    OR?: AnalyticsWhereInput[]
    NOT?: AnalyticsWhereInput | AnalyticsWhereInput[]
    id?: IntFilter<"Analytics"> | number
    userid?: IntFilter<"Analytics"> | number
    documentid?: IntFilter<"Analytics"> | number
    starttime?: DateTimeFilter<"Analytics"> | Date | string
    endtime?: DateTimeFilter<"Analytics"> | Date | string
    duration?: IntFilter<"Analytics"> | number
    createdat?: DateTimeFilter<"Analytics"> | Date | string
    updatedat?: DateTimeFilter<"Analytics"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AnalyticsOrderByWithRelationInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    starttime?: SortOrder
    endtime?: SortOrder
    duration?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    Document?: DocumentOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type AnalyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AnalyticsWhereInput | AnalyticsWhereInput[]
    OR?: AnalyticsWhereInput[]
    NOT?: AnalyticsWhereInput | AnalyticsWhereInput[]
    userid?: IntFilter<"Analytics"> | number
    documentid?: IntFilter<"Analytics"> | number
    starttime?: DateTimeFilter<"Analytics"> | Date | string
    endtime?: DateTimeFilter<"Analytics"> | Date | string
    duration?: IntFilter<"Analytics"> | number
    createdat?: DateTimeFilter<"Analytics"> | Date | string
    updatedat?: DateTimeFilter<"Analytics"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AnalyticsOrderByWithAggregationInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    starttime?: SortOrder
    endtime?: SortOrder
    duration?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    _count?: AnalyticsCountOrderByAggregateInput
    _avg?: AnalyticsAvgOrderByAggregateInput
    _max?: AnalyticsMaxOrderByAggregateInput
    _min?: AnalyticsMinOrderByAggregateInput
    _sum?: AnalyticsSumOrderByAggregateInput
  }

  export type AnalyticsScalarWhereWithAggregatesInput = {
    AND?: AnalyticsScalarWhereWithAggregatesInput | AnalyticsScalarWhereWithAggregatesInput[]
    OR?: AnalyticsScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsScalarWhereWithAggregatesInput | AnalyticsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Analytics"> | number
    userid?: IntWithAggregatesFilter<"Analytics"> | number
    documentid?: IntWithAggregatesFilter<"Analytics"> | number
    starttime?: DateTimeWithAggregatesFilter<"Analytics"> | Date | string
    endtime?: DateTimeWithAggregatesFilter<"Analytics"> | Date | string
    duration?: IntWithAggregatesFilter<"Analytics"> | number
    createdat?: DateTimeWithAggregatesFilter<"Analytics"> | Date | string
    updatedat?: DateTimeWithAggregatesFilter<"Analytics"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: IntFilter<"Document"> | number
    title?: StringFilter<"Document"> | string
    author?: StringNullableFilter<"Document"> | string | null
    isbn?: StringNullableFilter<"Document"> | string | null
    description?: StringNullableFilter<"Document"> | string | null
    coverurl?: StringNullableFilter<"Document"> | string | null
    filepath?: StringFilter<"Document"> | string
    filehash?: StringFilter<"Document"> | string
    uploadedbyid?: IntFilter<"Document"> | number
    tableofcontents?: JsonFilter<"Document">
    progress?: FloatFilter<"Document"> | number
    lastopened?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdat?: DateTimeFilter<"Document"> | Date | string
    updatedat?: DateTimeFilter<"Document"> | Date | string
    Analytics?: AnalyticsListRelationFilter
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    DocumentPreference?: DocumentPreferenceListRelationFilter
    Highlight?: HighlightListRelationFilter
    Chapters?: ChapterListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    coverurl?: SortOrderInput | SortOrder
    filepath?: SortOrder
    filehash?: SortOrder
    uploadedbyid?: SortOrder
    tableofcontents?: SortOrder
    progress?: SortOrder
    lastopened?: SortOrderInput | SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    Analytics?: AnalyticsOrderByRelationAggregateInput
    User?: UserOrderByWithRelationInput
    DocumentPreference?: DocumentPreferenceOrderByRelationAggregateInput
    Highlight?: HighlightOrderByRelationAggregateInput
    Chapters?: ChapterOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    isbn?: string
    filehash?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    title?: StringFilter<"Document"> | string
    author?: StringNullableFilter<"Document"> | string | null
    description?: StringNullableFilter<"Document"> | string | null
    coverurl?: StringNullableFilter<"Document"> | string | null
    filepath?: StringFilter<"Document"> | string
    uploadedbyid?: IntFilter<"Document"> | number
    tableofcontents?: JsonFilter<"Document">
    progress?: FloatFilter<"Document"> | number
    lastopened?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdat?: DateTimeFilter<"Document"> | Date | string
    updatedat?: DateTimeFilter<"Document"> | Date | string
    Analytics?: AnalyticsListRelationFilter
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    DocumentPreference?: DocumentPreferenceListRelationFilter
    Highlight?: HighlightListRelationFilter
    Chapters?: ChapterListRelationFilter
  }, "id" | "isbn" | "filehash">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    coverurl?: SortOrderInput | SortOrder
    filepath?: SortOrder
    filehash?: SortOrder
    uploadedbyid?: SortOrder
    tableofcontents?: SortOrder
    progress?: SortOrder
    lastopened?: SortOrderInput | SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Document"> | number
    title?: StringWithAggregatesFilter<"Document"> | string
    author?: StringNullableWithAggregatesFilter<"Document"> | string | null
    isbn?: StringNullableWithAggregatesFilter<"Document"> | string | null
    description?: StringNullableWithAggregatesFilter<"Document"> | string | null
    coverurl?: StringNullableWithAggregatesFilter<"Document"> | string | null
    filepath?: StringWithAggregatesFilter<"Document"> | string
    filehash?: StringWithAggregatesFilter<"Document"> | string
    uploadedbyid?: IntWithAggregatesFilter<"Document"> | number
    tableofcontents?: JsonWithAggregatesFilter<"Document">
    progress?: FloatWithAggregatesFilter<"Document"> | number
    lastopened?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    createdat?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedat?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type DocumentPreferenceWhereInput = {
    AND?: DocumentPreferenceWhereInput | DocumentPreferenceWhereInput[]
    OR?: DocumentPreferenceWhereInput[]
    NOT?: DocumentPreferenceWhereInput | DocumentPreferenceWhereInput[]
    id?: IntFilter<"DocumentPreference"> | number
    userid?: IntFilter<"DocumentPreference"> | number
    documentid?: IntFilter<"DocumentPreference"> | number
    theme?: StringFilter<"DocumentPreference"> | string
    fontsize?: StringFilter<"DocumentPreference"> | string
    notes?: JsonFilter<"DocumentPreference">
    createdat?: DateTimeFilter<"DocumentPreference"> | Date | string
    updatedat?: DateTimeFilter<"DocumentPreference"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DocumentPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    theme?: SortOrder
    fontsize?: SortOrder
    notes?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    Document?: DocumentOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type DocumentPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DocumentPreferenceWhereInput | DocumentPreferenceWhereInput[]
    OR?: DocumentPreferenceWhereInput[]
    NOT?: DocumentPreferenceWhereInput | DocumentPreferenceWhereInput[]
    userid?: IntFilter<"DocumentPreference"> | number
    documentid?: IntFilter<"DocumentPreference"> | number
    theme?: StringFilter<"DocumentPreference"> | string
    fontsize?: StringFilter<"DocumentPreference"> | string
    notes?: JsonFilter<"DocumentPreference">
    createdat?: DateTimeFilter<"DocumentPreference"> | Date | string
    updatedat?: DateTimeFilter<"DocumentPreference"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DocumentPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    theme?: SortOrder
    fontsize?: SortOrder
    notes?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    _count?: DocumentPreferenceCountOrderByAggregateInput
    _avg?: DocumentPreferenceAvgOrderByAggregateInput
    _max?: DocumentPreferenceMaxOrderByAggregateInput
    _min?: DocumentPreferenceMinOrderByAggregateInput
    _sum?: DocumentPreferenceSumOrderByAggregateInput
  }

  export type DocumentPreferenceScalarWhereWithAggregatesInput = {
    AND?: DocumentPreferenceScalarWhereWithAggregatesInput | DocumentPreferenceScalarWhereWithAggregatesInput[]
    OR?: DocumentPreferenceScalarWhereWithAggregatesInput[]
    NOT?: DocumentPreferenceScalarWhereWithAggregatesInput | DocumentPreferenceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DocumentPreference"> | number
    userid?: IntWithAggregatesFilter<"DocumentPreference"> | number
    documentid?: IntWithAggregatesFilter<"DocumentPreference"> | number
    theme?: StringWithAggregatesFilter<"DocumentPreference"> | string
    fontsize?: StringWithAggregatesFilter<"DocumentPreference"> | string
    notes?: JsonWithAggregatesFilter<"DocumentPreference">
    createdat?: DateTimeWithAggregatesFilter<"DocumentPreference"> | Date | string
    updatedat?: DateTimeWithAggregatesFilter<"DocumentPreference"> | Date | string
  }

  export type HighlightWhereInput = {
    AND?: HighlightWhereInput | HighlightWhereInput[]
    OR?: HighlightWhereInput[]
    NOT?: HighlightWhereInput | HighlightWhereInput[]
    id?: IntFilter<"Highlight"> | number
    documentid?: IntFilter<"Highlight"> | number
    userid?: IntFilter<"Highlight"> | number
    text?: StringFilter<"Highlight"> | string
    color?: StringFilter<"Highlight"> | string
    pagenumber?: IntFilter<"Highlight"> | number
    coordinates?: JsonFilter<"Highlight">
    createdat?: DateTimeFilter<"Highlight"> | Date | string
    updatedat?: DateTimeFilter<"Highlight"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type HighlightOrderByWithRelationInput = {
    id?: SortOrder
    documentid?: SortOrder
    userid?: SortOrder
    text?: SortOrder
    color?: SortOrder
    pagenumber?: SortOrder
    coordinates?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    Document?: DocumentOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type HighlightWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HighlightWhereInput | HighlightWhereInput[]
    OR?: HighlightWhereInput[]
    NOT?: HighlightWhereInput | HighlightWhereInput[]
    documentid?: IntFilter<"Highlight"> | number
    userid?: IntFilter<"Highlight"> | number
    text?: StringFilter<"Highlight"> | string
    color?: StringFilter<"Highlight"> | string
    pagenumber?: IntFilter<"Highlight"> | number
    coordinates?: JsonFilter<"Highlight">
    createdat?: DateTimeFilter<"Highlight"> | Date | string
    updatedat?: DateTimeFilter<"Highlight"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type HighlightOrderByWithAggregationInput = {
    id?: SortOrder
    documentid?: SortOrder
    userid?: SortOrder
    text?: SortOrder
    color?: SortOrder
    pagenumber?: SortOrder
    coordinates?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    _count?: HighlightCountOrderByAggregateInput
    _avg?: HighlightAvgOrderByAggregateInput
    _max?: HighlightMaxOrderByAggregateInput
    _min?: HighlightMinOrderByAggregateInput
    _sum?: HighlightSumOrderByAggregateInput
  }

  export type HighlightScalarWhereWithAggregatesInput = {
    AND?: HighlightScalarWhereWithAggregatesInput | HighlightScalarWhereWithAggregatesInput[]
    OR?: HighlightScalarWhereWithAggregatesInput[]
    NOT?: HighlightScalarWhereWithAggregatesInput | HighlightScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Highlight"> | number
    documentid?: IntWithAggregatesFilter<"Highlight"> | number
    userid?: IntWithAggregatesFilter<"Highlight"> | number
    text?: StringWithAggregatesFilter<"Highlight"> | string
    color?: StringWithAggregatesFilter<"Highlight"> | string
    pagenumber?: IntWithAggregatesFilter<"Highlight"> | number
    coordinates?: JsonWithAggregatesFilter<"Highlight">
    createdat?: DateTimeWithAggregatesFilter<"Highlight"> | Date | string
    updatedat?: DateTimeWithAggregatesFilter<"Highlight"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordhash?: StringNullableFilter<"User"> | string | null
    createdat?: DateTimeFilter<"User"> | Date | string
    updatedat?: DateTimeFilter<"User"> | Date | string
    Analytics?: AnalyticsListRelationFilter
    Document?: DocumentListRelationFilter
    DocumentPreference?: DocumentPreferenceListRelationFilter
    Highlight?: HighlightListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordhash?: SortOrderInput | SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    Analytics?: AnalyticsOrderByRelationAggregateInput
    Document?: DocumentOrderByRelationAggregateInput
    DocumentPreference?: DocumentPreferenceOrderByRelationAggregateInput
    Highlight?: HighlightOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordhash?: StringNullableFilter<"User"> | string | null
    createdat?: DateTimeFilter<"User"> | Date | string
    updatedat?: DateTimeFilter<"User"> | Date | string
    Analytics?: AnalyticsListRelationFilter
    Document?: DocumentListRelationFilter
    DocumentPreference?: DocumentPreferenceListRelationFilter
    Highlight?: HighlightListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordhash?: SortOrderInput | SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordhash?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdat?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedat?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ChapterWhereInput = {
    AND?: ChapterWhereInput | ChapterWhereInput[]
    OR?: ChapterWhereInput[]
    NOT?: ChapterWhereInput | ChapterWhereInput[]
    id?: IntFilter<"Chapter"> | number
    documentId?: IntFilter<"Chapter"> | number
    title?: StringFilter<"Chapter"> | string
    startPage?: IntFilter<"Chapter"> | number
    endPage?: IntFilter<"Chapter"> | number
    pdfPath?: StringFilter<"Chapter"> | string
    htmlPath?: StringFilter<"Chapter"> | string
    createdAt?: DateTimeFilter<"Chapter"> | Date | string
    updatedAt?: DateTimeFilter<"Chapter"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type ChapterOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    title?: SortOrder
    startPage?: SortOrder
    endPage?: SortOrder
    pdfPath?: SortOrder
    htmlPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Document?: DocumentOrderByWithRelationInput
  }

  export type ChapterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChapterWhereInput | ChapterWhereInput[]
    OR?: ChapterWhereInput[]
    NOT?: ChapterWhereInput | ChapterWhereInput[]
    documentId?: IntFilter<"Chapter"> | number
    title?: StringFilter<"Chapter"> | string
    startPage?: IntFilter<"Chapter"> | number
    endPage?: IntFilter<"Chapter"> | number
    pdfPath?: StringFilter<"Chapter"> | string
    htmlPath?: StringFilter<"Chapter"> | string
    createdAt?: DateTimeFilter<"Chapter"> | Date | string
    updatedAt?: DateTimeFilter<"Chapter"> | Date | string
    Document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id">

  export type ChapterOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    title?: SortOrder
    startPage?: SortOrder
    endPage?: SortOrder
    pdfPath?: SortOrder
    htmlPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChapterCountOrderByAggregateInput
    _avg?: ChapterAvgOrderByAggregateInput
    _max?: ChapterMaxOrderByAggregateInput
    _min?: ChapterMinOrderByAggregateInput
    _sum?: ChapterSumOrderByAggregateInput
  }

  export type ChapterScalarWhereWithAggregatesInput = {
    AND?: ChapterScalarWhereWithAggregatesInput | ChapterScalarWhereWithAggregatesInput[]
    OR?: ChapterScalarWhereWithAggregatesInput[]
    NOT?: ChapterScalarWhereWithAggregatesInput | ChapterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Chapter"> | number
    documentId?: IntWithAggregatesFilter<"Chapter"> | number
    title?: StringWithAggregatesFilter<"Chapter"> | string
    startPage?: IntWithAggregatesFilter<"Chapter"> | number
    endPage?: IntWithAggregatesFilter<"Chapter"> | number
    pdfPath?: StringWithAggregatesFilter<"Chapter"> | string
    htmlPath?: StringWithAggregatesFilter<"Chapter"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Chapter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Chapter"> | Date | string
  }

  export type AnalyticsCreateInput = {
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
    Document: DocumentCreateNestedOneWithoutAnalyticsInput
    User: UserCreateNestedOneWithoutAnalyticsInput
  }

  export type AnalyticsUncheckedCreateInput = {
    id?: number
    userid: number
    documentid: number
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type AnalyticsUpdateInput = {
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateOneRequiredWithoutAnalyticsNestedInput
    User?: UserUpdateOneRequiredWithoutAnalyticsNestedInput
  }

  export type AnalyticsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsCreateManyInput = {
    id?: number
    userid: number
    documentid: number
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type AnalyticsUpdateManyMutationInput = {
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutDocumentInput
    User: UserCreateNestedOneWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    uploadedbyid: number
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutDocumentNestedInput
    User?: UserUpdateOneRequiredWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    uploadedbyid?: IntFieldUpdateOperationsInput | number
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    uploadedbyid: number
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    uploadedbyid?: IntFieldUpdateOperationsInput | number
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPreferenceCreateInput = {
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
    Document: DocumentCreateNestedOneWithoutDocumentPreferenceInput
    User: UserCreateNestedOneWithoutDocumentPreferenceInput
  }

  export type DocumentPreferenceUncheckedCreateInput = {
    id?: number
    userid: number
    documentid: number
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentPreferenceUpdateInput = {
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateOneRequiredWithoutDocumentPreferenceNestedInput
    User?: UserUpdateOneRequiredWithoutDocumentPreferenceNestedInput
  }

  export type DocumentPreferenceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPreferenceCreateManyInput = {
    id?: number
    userid: number
    documentid: number
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentPreferenceUpdateManyMutationInput = {
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPreferenceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HighlightCreateInput = {
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
    Document: DocumentCreateNestedOneWithoutHighlightInput
    User: UserCreateNestedOneWithoutHighlightInput
  }

  export type HighlightUncheckedCreateInput = {
    id?: number
    documentid: number
    userid: number
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type HighlightUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateOneRequiredWithoutHighlightNestedInput
    User?: UserUpdateOneRequiredWithoutHighlightNestedInput
  }

  export type HighlightUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HighlightCreateManyInput = {
    id?: number
    documentid: number
    userid: number
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type HighlightUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HighlightUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutUserInput
    Document?: DocumentCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutUserInput
    Highlight?: HighlightCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutUserInput
    Document?: DocumentUncheckedCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutUserInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutUserNestedInput
    Document?: DocumentUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutUserNestedInput
    Document?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChapterCreateInput = {
    title: string
    startPage: number
    endPage: number
    pdfPath: string
    htmlPath: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Document: DocumentCreateNestedOneWithoutChaptersInput
  }

  export type ChapterUncheckedCreateInput = {
    id?: number
    documentId: number
    title: string
    startPage: number
    endPage: number
    pdfPath: string
    htmlPath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChapterUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    startPage?: IntFieldUpdateOperationsInput | number
    endPage?: IntFieldUpdateOperationsInput | number
    pdfPath?: StringFieldUpdateOperationsInput | string
    htmlPath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateOneRequiredWithoutChaptersNestedInput
  }

  export type ChapterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    startPage?: IntFieldUpdateOperationsInput | number
    endPage?: IntFieldUpdateOperationsInput | number
    pdfPath?: StringFieldUpdateOperationsInput | string
    htmlPath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChapterCreateManyInput = {
    id?: number
    documentId: number
    title: string
    startPage: number
    endPage: number
    pdfPath: string
    htmlPath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChapterUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    startPage?: IntFieldUpdateOperationsInput | number
    endPage?: IntFieldUpdateOperationsInput | number
    pdfPath?: StringFieldUpdateOperationsInput | string
    htmlPath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChapterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    startPage?: IntFieldUpdateOperationsInput | number
    endPage?: IntFieldUpdateOperationsInput | number
    pdfPath?: StringFieldUpdateOperationsInput | string
    htmlPath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AnalyticsCountOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    starttime?: SortOrder
    endtime?: SortOrder
    duration?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type AnalyticsAvgOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    duration?: SortOrder
  }

  export type AnalyticsMaxOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    starttime?: SortOrder
    endtime?: SortOrder
    duration?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type AnalyticsMinOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    starttime?: SortOrder
    endtime?: SortOrder
    duration?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type AnalyticsSumOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AnalyticsListRelationFilter = {
    every?: AnalyticsWhereInput
    some?: AnalyticsWhereInput
    none?: AnalyticsWhereInput
  }

  export type DocumentPreferenceListRelationFilter = {
    every?: DocumentPreferenceWhereInput
    some?: DocumentPreferenceWhereInput
    none?: DocumentPreferenceWhereInput
  }

  export type HighlightListRelationFilter = {
    every?: HighlightWhereInput
    some?: HighlightWhereInput
    none?: HighlightWhereInput
  }

  export type ChapterListRelationFilter = {
    every?: ChapterWhereInput
    some?: ChapterWhereInput
    none?: ChapterWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AnalyticsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentPreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HighlightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChapterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    description?: SortOrder
    coverurl?: SortOrder
    filepath?: SortOrder
    filehash?: SortOrder
    uploadedbyid?: SortOrder
    tableofcontents?: SortOrder
    progress?: SortOrder
    lastopened?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    id?: SortOrder
    uploadedbyid?: SortOrder
    progress?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    description?: SortOrder
    coverurl?: SortOrder
    filepath?: SortOrder
    filehash?: SortOrder
    uploadedbyid?: SortOrder
    progress?: SortOrder
    lastopened?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    description?: SortOrder
    coverurl?: SortOrder
    filepath?: SortOrder
    filehash?: SortOrder
    uploadedbyid?: SortOrder
    progress?: SortOrder
    lastopened?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    id?: SortOrder
    uploadedbyid?: SortOrder
    progress?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DocumentPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    theme?: SortOrder
    fontsize?: SortOrder
    notes?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type DocumentPreferenceAvgOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
  }

  export type DocumentPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    theme?: SortOrder
    fontsize?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type DocumentPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
    theme?: SortOrder
    fontsize?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type DocumentPreferenceSumOrderByAggregateInput = {
    id?: SortOrder
    userid?: SortOrder
    documentid?: SortOrder
  }

  export type HighlightCountOrderByAggregateInput = {
    id?: SortOrder
    documentid?: SortOrder
    userid?: SortOrder
    text?: SortOrder
    color?: SortOrder
    pagenumber?: SortOrder
    coordinates?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type HighlightAvgOrderByAggregateInput = {
    id?: SortOrder
    documentid?: SortOrder
    userid?: SortOrder
    pagenumber?: SortOrder
  }

  export type HighlightMaxOrderByAggregateInput = {
    id?: SortOrder
    documentid?: SortOrder
    userid?: SortOrder
    text?: SortOrder
    color?: SortOrder
    pagenumber?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type HighlightMinOrderByAggregateInput = {
    id?: SortOrder
    documentid?: SortOrder
    userid?: SortOrder
    text?: SortOrder
    color?: SortOrder
    pagenumber?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type HighlightSumOrderByAggregateInput = {
    id?: SortOrder
    documentid?: SortOrder
    userid?: SortOrder
    pagenumber?: SortOrder
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordhash?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordhash?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordhash?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChapterCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    title?: SortOrder
    startPage?: SortOrder
    endPage?: SortOrder
    pdfPath?: SortOrder
    htmlPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChapterAvgOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    startPage?: SortOrder
    endPage?: SortOrder
  }

  export type ChapterMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    title?: SortOrder
    startPage?: SortOrder
    endPage?: SortOrder
    pdfPath?: SortOrder
    htmlPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChapterMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    title?: SortOrder
    startPage?: SortOrder
    endPage?: SortOrder
    pdfPath?: SortOrder
    htmlPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChapterSumOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    startPage?: SortOrder
    endPage?: SortOrder
  }

  export type DocumentCreateNestedOneWithoutAnalyticsInput = {
    create?: XOR<DocumentCreateWithoutAnalyticsInput, DocumentUncheckedCreateWithoutAnalyticsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAnalyticsInput
    connect?: DocumentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAnalyticsInput = {
    create?: XOR<UserCreateWithoutAnalyticsInput, UserUncheckedCreateWithoutAnalyticsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalyticsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DocumentUpdateOneRequiredWithoutAnalyticsNestedInput = {
    create?: XOR<DocumentCreateWithoutAnalyticsInput, DocumentUncheckedCreateWithoutAnalyticsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAnalyticsInput
    upsert?: DocumentUpsertWithoutAnalyticsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutAnalyticsInput, DocumentUpdateWithoutAnalyticsInput>, DocumentUncheckedUpdateWithoutAnalyticsInput>
  }

  export type UserUpdateOneRequiredWithoutAnalyticsNestedInput = {
    create?: XOR<UserCreateWithoutAnalyticsInput, UserUncheckedCreateWithoutAnalyticsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalyticsInput
    upsert?: UserUpsertWithoutAnalyticsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnalyticsInput, UserUpdateWithoutAnalyticsInput>, UserUncheckedUpdateWithoutAnalyticsInput>
  }

  export type AnalyticsCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AnalyticsCreateWithoutDocumentInput, AnalyticsUncheckedCreateWithoutDocumentInput> | AnalyticsCreateWithoutDocumentInput[] | AnalyticsUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutDocumentInput | AnalyticsCreateOrConnectWithoutDocumentInput[]
    createMany?: AnalyticsCreateManyDocumentInputEnvelope
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutDocumentInput = {
    create?: XOR<UserCreateWithoutDocumentInput, UserUncheckedCreateWithoutDocumentInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentPreferenceCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentPreferenceCreateWithoutDocumentInput, DocumentPreferenceUncheckedCreateWithoutDocumentInput> | DocumentPreferenceCreateWithoutDocumentInput[] | DocumentPreferenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutDocumentInput | DocumentPreferenceCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentPreferenceCreateManyDocumentInputEnvelope
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
  }

  export type HighlightCreateNestedManyWithoutDocumentInput = {
    create?: XOR<HighlightCreateWithoutDocumentInput, HighlightUncheckedCreateWithoutDocumentInput> | HighlightCreateWithoutDocumentInput[] | HighlightUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutDocumentInput | HighlightCreateOrConnectWithoutDocumentInput[]
    createMany?: HighlightCreateManyDocumentInputEnvelope
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
  }

  export type ChapterCreateNestedManyWithoutDocumentInput = {
    create?: XOR<ChapterCreateWithoutDocumentInput, ChapterUncheckedCreateWithoutDocumentInput> | ChapterCreateWithoutDocumentInput[] | ChapterUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChapterCreateOrConnectWithoutDocumentInput | ChapterCreateOrConnectWithoutDocumentInput[]
    createMany?: ChapterCreateManyDocumentInputEnvelope
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
  }

  export type AnalyticsUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AnalyticsCreateWithoutDocumentInput, AnalyticsUncheckedCreateWithoutDocumentInput> | AnalyticsCreateWithoutDocumentInput[] | AnalyticsUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutDocumentInput | AnalyticsCreateOrConnectWithoutDocumentInput[]
    createMany?: AnalyticsCreateManyDocumentInputEnvelope
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
  }

  export type DocumentPreferenceUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentPreferenceCreateWithoutDocumentInput, DocumentPreferenceUncheckedCreateWithoutDocumentInput> | DocumentPreferenceCreateWithoutDocumentInput[] | DocumentPreferenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutDocumentInput | DocumentPreferenceCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentPreferenceCreateManyDocumentInputEnvelope
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
  }

  export type HighlightUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<HighlightCreateWithoutDocumentInput, HighlightUncheckedCreateWithoutDocumentInput> | HighlightCreateWithoutDocumentInput[] | HighlightUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutDocumentInput | HighlightCreateOrConnectWithoutDocumentInput[]
    createMany?: HighlightCreateManyDocumentInputEnvelope
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
  }

  export type ChapterUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<ChapterCreateWithoutDocumentInput, ChapterUncheckedCreateWithoutDocumentInput> | ChapterCreateWithoutDocumentInput[] | ChapterUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChapterCreateOrConnectWithoutDocumentInput | ChapterCreateOrConnectWithoutDocumentInput[]
    createMany?: ChapterCreateManyDocumentInputEnvelope
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AnalyticsUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AnalyticsCreateWithoutDocumentInput, AnalyticsUncheckedCreateWithoutDocumentInput> | AnalyticsCreateWithoutDocumentInput[] | AnalyticsUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutDocumentInput | AnalyticsCreateOrConnectWithoutDocumentInput[]
    upsert?: AnalyticsUpsertWithWhereUniqueWithoutDocumentInput | AnalyticsUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AnalyticsCreateManyDocumentInputEnvelope
    set?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    disconnect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    delete?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    update?: AnalyticsUpdateWithWhereUniqueWithoutDocumentInput | AnalyticsUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AnalyticsUpdateManyWithWhereWithoutDocumentInput | AnalyticsUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AnalyticsScalarWhereInput | AnalyticsScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutDocumentNestedInput = {
    create?: XOR<UserCreateWithoutDocumentInput, UserUncheckedCreateWithoutDocumentInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentInput
    upsert?: UserUpsertWithoutDocumentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentInput, UserUpdateWithoutDocumentInput>, UserUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentPreferenceUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentPreferenceCreateWithoutDocumentInput, DocumentPreferenceUncheckedCreateWithoutDocumentInput> | DocumentPreferenceCreateWithoutDocumentInput[] | DocumentPreferenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutDocumentInput | DocumentPreferenceCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentPreferenceUpsertWithWhereUniqueWithoutDocumentInput | DocumentPreferenceUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentPreferenceCreateManyDocumentInputEnvelope
    set?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    disconnect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    delete?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    update?: DocumentPreferenceUpdateWithWhereUniqueWithoutDocumentInput | DocumentPreferenceUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentPreferenceUpdateManyWithWhereWithoutDocumentInput | DocumentPreferenceUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentPreferenceScalarWhereInput | DocumentPreferenceScalarWhereInput[]
  }

  export type HighlightUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<HighlightCreateWithoutDocumentInput, HighlightUncheckedCreateWithoutDocumentInput> | HighlightCreateWithoutDocumentInput[] | HighlightUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutDocumentInput | HighlightCreateOrConnectWithoutDocumentInput[]
    upsert?: HighlightUpsertWithWhereUniqueWithoutDocumentInput | HighlightUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: HighlightCreateManyDocumentInputEnvelope
    set?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    disconnect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    delete?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    update?: HighlightUpdateWithWhereUniqueWithoutDocumentInput | HighlightUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: HighlightUpdateManyWithWhereWithoutDocumentInput | HighlightUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: HighlightScalarWhereInput | HighlightScalarWhereInput[]
  }

  export type ChapterUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<ChapterCreateWithoutDocumentInput, ChapterUncheckedCreateWithoutDocumentInput> | ChapterCreateWithoutDocumentInput[] | ChapterUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChapterCreateOrConnectWithoutDocumentInput | ChapterCreateOrConnectWithoutDocumentInput[]
    upsert?: ChapterUpsertWithWhereUniqueWithoutDocumentInput | ChapterUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: ChapterCreateManyDocumentInputEnvelope
    set?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    disconnect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    delete?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    update?: ChapterUpdateWithWhereUniqueWithoutDocumentInput | ChapterUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: ChapterUpdateManyWithWhereWithoutDocumentInput | ChapterUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: ChapterScalarWhereInput | ChapterScalarWhereInput[]
  }

  export type AnalyticsUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AnalyticsCreateWithoutDocumentInput, AnalyticsUncheckedCreateWithoutDocumentInput> | AnalyticsCreateWithoutDocumentInput[] | AnalyticsUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutDocumentInput | AnalyticsCreateOrConnectWithoutDocumentInput[]
    upsert?: AnalyticsUpsertWithWhereUniqueWithoutDocumentInput | AnalyticsUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AnalyticsCreateManyDocumentInputEnvelope
    set?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    disconnect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    delete?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    update?: AnalyticsUpdateWithWhereUniqueWithoutDocumentInput | AnalyticsUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AnalyticsUpdateManyWithWhereWithoutDocumentInput | AnalyticsUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AnalyticsScalarWhereInput | AnalyticsScalarWhereInput[]
  }

  export type DocumentPreferenceUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentPreferenceCreateWithoutDocumentInput, DocumentPreferenceUncheckedCreateWithoutDocumentInput> | DocumentPreferenceCreateWithoutDocumentInput[] | DocumentPreferenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutDocumentInput | DocumentPreferenceCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentPreferenceUpsertWithWhereUniqueWithoutDocumentInput | DocumentPreferenceUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentPreferenceCreateManyDocumentInputEnvelope
    set?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    disconnect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    delete?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    update?: DocumentPreferenceUpdateWithWhereUniqueWithoutDocumentInput | DocumentPreferenceUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentPreferenceUpdateManyWithWhereWithoutDocumentInput | DocumentPreferenceUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentPreferenceScalarWhereInput | DocumentPreferenceScalarWhereInput[]
  }

  export type HighlightUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<HighlightCreateWithoutDocumentInput, HighlightUncheckedCreateWithoutDocumentInput> | HighlightCreateWithoutDocumentInput[] | HighlightUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutDocumentInput | HighlightCreateOrConnectWithoutDocumentInput[]
    upsert?: HighlightUpsertWithWhereUniqueWithoutDocumentInput | HighlightUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: HighlightCreateManyDocumentInputEnvelope
    set?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    disconnect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    delete?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    update?: HighlightUpdateWithWhereUniqueWithoutDocumentInput | HighlightUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: HighlightUpdateManyWithWhereWithoutDocumentInput | HighlightUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: HighlightScalarWhereInput | HighlightScalarWhereInput[]
  }

  export type ChapterUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<ChapterCreateWithoutDocumentInput, ChapterUncheckedCreateWithoutDocumentInput> | ChapterCreateWithoutDocumentInput[] | ChapterUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChapterCreateOrConnectWithoutDocumentInput | ChapterCreateOrConnectWithoutDocumentInput[]
    upsert?: ChapterUpsertWithWhereUniqueWithoutDocumentInput | ChapterUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: ChapterCreateManyDocumentInputEnvelope
    set?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    disconnect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    delete?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[]
    update?: ChapterUpdateWithWhereUniqueWithoutDocumentInput | ChapterUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: ChapterUpdateManyWithWhereWithoutDocumentInput | ChapterUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: ChapterScalarWhereInput | ChapterScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutDocumentPreferenceInput = {
    create?: XOR<DocumentCreateWithoutDocumentPreferenceInput, DocumentUncheckedCreateWithoutDocumentPreferenceInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutDocumentPreferenceInput
    connect?: DocumentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDocumentPreferenceInput = {
    create?: XOR<UserCreateWithoutDocumentPreferenceInput, UserUncheckedCreateWithoutDocumentPreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentPreferenceInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutDocumentPreferenceNestedInput = {
    create?: XOR<DocumentCreateWithoutDocumentPreferenceInput, DocumentUncheckedCreateWithoutDocumentPreferenceInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutDocumentPreferenceInput
    upsert?: DocumentUpsertWithoutDocumentPreferenceInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutDocumentPreferenceInput, DocumentUpdateWithoutDocumentPreferenceInput>, DocumentUncheckedUpdateWithoutDocumentPreferenceInput>
  }

  export type UserUpdateOneRequiredWithoutDocumentPreferenceNestedInput = {
    create?: XOR<UserCreateWithoutDocumentPreferenceInput, UserUncheckedCreateWithoutDocumentPreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentPreferenceInput
    upsert?: UserUpsertWithoutDocumentPreferenceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentPreferenceInput, UserUpdateWithoutDocumentPreferenceInput>, UserUncheckedUpdateWithoutDocumentPreferenceInput>
  }

  export type DocumentCreateNestedOneWithoutHighlightInput = {
    create?: XOR<DocumentCreateWithoutHighlightInput, DocumentUncheckedCreateWithoutHighlightInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutHighlightInput
    connect?: DocumentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutHighlightInput = {
    create?: XOR<UserCreateWithoutHighlightInput, UserUncheckedCreateWithoutHighlightInput>
    connectOrCreate?: UserCreateOrConnectWithoutHighlightInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutHighlightNestedInput = {
    create?: XOR<DocumentCreateWithoutHighlightInput, DocumentUncheckedCreateWithoutHighlightInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutHighlightInput
    upsert?: DocumentUpsertWithoutHighlightInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutHighlightInput, DocumentUpdateWithoutHighlightInput>, DocumentUncheckedUpdateWithoutHighlightInput>
  }

  export type UserUpdateOneRequiredWithoutHighlightNestedInput = {
    create?: XOR<UserCreateWithoutHighlightInput, UserUncheckedCreateWithoutHighlightInput>
    connectOrCreate?: UserCreateOrConnectWithoutHighlightInput
    upsert?: UserUpsertWithoutHighlightInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHighlightInput, UserUpdateWithoutHighlightInput>, UserUncheckedUpdateWithoutHighlightInput>
  }

  export type AnalyticsCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalyticsCreateWithoutUserInput, AnalyticsUncheckedCreateWithoutUserInput> | AnalyticsCreateWithoutUserInput[] | AnalyticsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutUserInput | AnalyticsCreateOrConnectWithoutUserInput[]
    createMany?: AnalyticsCreateManyUserInputEnvelope
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentPreferenceCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentPreferenceCreateWithoutUserInput, DocumentPreferenceUncheckedCreateWithoutUserInput> | DocumentPreferenceCreateWithoutUserInput[] | DocumentPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutUserInput | DocumentPreferenceCreateOrConnectWithoutUserInput[]
    createMany?: DocumentPreferenceCreateManyUserInputEnvelope
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
  }

  export type HighlightCreateNestedManyWithoutUserInput = {
    create?: XOR<HighlightCreateWithoutUserInput, HighlightUncheckedCreateWithoutUserInput> | HighlightCreateWithoutUserInput[] | HighlightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutUserInput | HighlightCreateOrConnectWithoutUserInput[]
    createMany?: HighlightCreateManyUserInputEnvelope
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
  }

  export type AnalyticsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalyticsCreateWithoutUserInput, AnalyticsUncheckedCreateWithoutUserInput> | AnalyticsCreateWithoutUserInput[] | AnalyticsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutUserInput | AnalyticsCreateOrConnectWithoutUserInput[]
    createMany?: AnalyticsCreateManyUserInputEnvelope
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentPreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentPreferenceCreateWithoutUserInput, DocumentPreferenceUncheckedCreateWithoutUserInput> | DocumentPreferenceCreateWithoutUserInput[] | DocumentPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutUserInput | DocumentPreferenceCreateOrConnectWithoutUserInput[]
    createMany?: DocumentPreferenceCreateManyUserInputEnvelope
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
  }

  export type HighlightUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HighlightCreateWithoutUserInput, HighlightUncheckedCreateWithoutUserInput> | HighlightCreateWithoutUserInput[] | HighlightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutUserInput | HighlightCreateOrConnectWithoutUserInput[]
    createMany?: HighlightCreateManyUserInputEnvelope
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
  }

  export type AnalyticsUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalyticsCreateWithoutUserInput, AnalyticsUncheckedCreateWithoutUserInput> | AnalyticsCreateWithoutUserInput[] | AnalyticsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutUserInput | AnalyticsCreateOrConnectWithoutUserInput[]
    upsert?: AnalyticsUpsertWithWhereUniqueWithoutUserInput | AnalyticsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalyticsCreateManyUserInputEnvelope
    set?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    disconnect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    delete?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    update?: AnalyticsUpdateWithWhereUniqueWithoutUserInput | AnalyticsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalyticsUpdateManyWithWhereWithoutUserInput | AnalyticsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalyticsScalarWhereInput | AnalyticsScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentPreferenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentPreferenceCreateWithoutUserInput, DocumentPreferenceUncheckedCreateWithoutUserInput> | DocumentPreferenceCreateWithoutUserInput[] | DocumentPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutUserInput | DocumentPreferenceCreateOrConnectWithoutUserInput[]
    upsert?: DocumentPreferenceUpsertWithWhereUniqueWithoutUserInput | DocumentPreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentPreferenceCreateManyUserInputEnvelope
    set?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    disconnect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    delete?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    update?: DocumentPreferenceUpdateWithWhereUniqueWithoutUserInput | DocumentPreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentPreferenceUpdateManyWithWhereWithoutUserInput | DocumentPreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentPreferenceScalarWhereInput | DocumentPreferenceScalarWhereInput[]
  }

  export type HighlightUpdateManyWithoutUserNestedInput = {
    create?: XOR<HighlightCreateWithoutUserInput, HighlightUncheckedCreateWithoutUserInput> | HighlightCreateWithoutUserInput[] | HighlightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutUserInput | HighlightCreateOrConnectWithoutUserInput[]
    upsert?: HighlightUpsertWithWhereUniqueWithoutUserInput | HighlightUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HighlightCreateManyUserInputEnvelope
    set?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    disconnect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    delete?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    update?: HighlightUpdateWithWhereUniqueWithoutUserInput | HighlightUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HighlightUpdateManyWithWhereWithoutUserInput | HighlightUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HighlightScalarWhereInput | HighlightScalarWhereInput[]
  }

  export type AnalyticsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalyticsCreateWithoutUserInput, AnalyticsUncheckedCreateWithoutUserInput> | AnalyticsCreateWithoutUserInput[] | AnalyticsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsCreateOrConnectWithoutUserInput | AnalyticsCreateOrConnectWithoutUserInput[]
    upsert?: AnalyticsUpsertWithWhereUniqueWithoutUserInput | AnalyticsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalyticsCreateManyUserInputEnvelope
    set?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    disconnect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    delete?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    connect?: AnalyticsWhereUniqueInput | AnalyticsWhereUniqueInput[]
    update?: AnalyticsUpdateWithWhereUniqueWithoutUserInput | AnalyticsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalyticsUpdateManyWithWhereWithoutUserInput | AnalyticsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalyticsScalarWhereInput | AnalyticsScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentPreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentPreferenceCreateWithoutUserInput, DocumentPreferenceUncheckedCreateWithoutUserInput> | DocumentPreferenceCreateWithoutUserInput[] | DocumentPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentPreferenceCreateOrConnectWithoutUserInput | DocumentPreferenceCreateOrConnectWithoutUserInput[]
    upsert?: DocumentPreferenceUpsertWithWhereUniqueWithoutUserInput | DocumentPreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentPreferenceCreateManyUserInputEnvelope
    set?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    disconnect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    delete?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    connect?: DocumentPreferenceWhereUniqueInput | DocumentPreferenceWhereUniqueInput[]
    update?: DocumentPreferenceUpdateWithWhereUniqueWithoutUserInput | DocumentPreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentPreferenceUpdateManyWithWhereWithoutUserInput | DocumentPreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentPreferenceScalarWhereInput | DocumentPreferenceScalarWhereInput[]
  }

  export type HighlightUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HighlightCreateWithoutUserInput, HighlightUncheckedCreateWithoutUserInput> | HighlightCreateWithoutUserInput[] | HighlightUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HighlightCreateOrConnectWithoutUserInput | HighlightCreateOrConnectWithoutUserInput[]
    upsert?: HighlightUpsertWithWhereUniqueWithoutUserInput | HighlightUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HighlightCreateManyUserInputEnvelope
    set?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    disconnect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    delete?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    connect?: HighlightWhereUniqueInput | HighlightWhereUniqueInput[]
    update?: HighlightUpdateWithWhereUniqueWithoutUserInput | HighlightUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HighlightUpdateManyWithWhereWithoutUserInput | HighlightUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HighlightScalarWhereInput | HighlightScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutChaptersInput = {
    create?: XOR<DocumentCreateWithoutChaptersInput, DocumentUncheckedCreateWithoutChaptersInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChaptersInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutChaptersNestedInput = {
    create?: XOR<DocumentCreateWithoutChaptersInput, DocumentUncheckedCreateWithoutChaptersInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChaptersInput
    upsert?: DocumentUpsertWithoutChaptersInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutChaptersInput, DocumentUpdateWithoutChaptersInput>, DocumentUncheckedUpdateWithoutChaptersInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DocumentCreateWithoutAnalyticsInput = {
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    User: UserCreateNestedOneWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutAnalyticsInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    uploadedbyid: number
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutAnalyticsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutAnalyticsInput, DocumentUncheckedCreateWithoutAnalyticsInput>
  }

  export type UserCreateWithoutAnalyticsInput = {
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Document?: DocumentCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutUserInput
    Highlight?: HighlightCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnalyticsInput = {
    id?: number
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Document?: DocumentUncheckedCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutUserInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnalyticsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnalyticsInput, UserUncheckedCreateWithoutAnalyticsInput>
  }

  export type DocumentUpsertWithoutAnalyticsInput = {
    update: XOR<DocumentUpdateWithoutAnalyticsInput, DocumentUncheckedUpdateWithoutAnalyticsInput>
    create: XOR<DocumentCreateWithoutAnalyticsInput, DocumentUncheckedCreateWithoutAnalyticsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutAnalyticsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutAnalyticsInput, DocumentUncheckedUpdateWithoutAnalyticsInput>
  }

  export type DocumentUpdateWithoutAnalyticsInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutAnalyticsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    uploadedbyid?: IntFieldUpdateOperationsInput | number
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type UserUpsertWithoutAnalyticsInput = {
    update: XOR<UserUpdateWithoutAnalyticsInput, UserUncheckedUpdateWithoutAnalyticsInput>
    create: XOR<UserCreateWithoutAnalyticsInput, UserUncheckedCreateWithoutAnalyticsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnalyticsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnalyticsInput, UserUncheckedUpdateWithoutAnalyticsInput>
  }

  export type UserUpdateWithoutAnalyticsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnalyticsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnalyticsCreateWithoutDocumentInput = {
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
    User: UserCreateNestedOneWithoutAnalyticsInput
  }

  export type AnalyticsUncheckedCreateWithoutDocumentInput = {
    id?: number
    userid: number
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type AnalyticsCreateOrConnectWithoutDocumentInput = {
    where: AnalyticsWhereUniqueInput
    create: XOR<AnalyticsCreateWithoutDocumentInput, AnalyticsUncheckedCreateWithoutDocumentInput>
  }

  export type AnalyticsCreateManyDocumentInputEnvelope = {
    data: AnalyticsCreateManyDocumentInput | AnalyticsCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutDocumentInput = {
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutUserInput
    Highlight?: HighlightCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentInput = {
    id?: number
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutUserInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentInput, UserUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentPreferenceCreateWithoutDocumentInput = {
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
    User: UserCreateNestedOneWithoutDocumentPreferenceInput
  }

  export type DocumentPreferenceUncheckedCreateWithoutDocumentInput = {
    id?: number
    userid: number
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentPreferenceCreateOrConnectWithoutDocumentInput = {
    where: DocumentPreferenceWhereUniqueInput
    create: XOR<DocumentPreferenceCreateWithoutDocumentInput, DocumentPreferenceUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentPreferenceCreateManyDocumentInputEnvelope = {
    data: DocumentPreferenceCreateManyDocumentInput | DocumentPreferenceCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type HighlightCreateWithoutDocumentInput = {
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
    User: UserCreateNestedOneWithoutHighlightInput
  }

  export type HighlightUncheckedCreateWithoutDocumentInput = {
    id?: number
    userid: number
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type HighlightCreateOrConnectWithoutDocumentInput = {
    where: HighlightWhereUniqueInput
    create: XOR<HighlightCreateWithoutDocumentInput, HighlightUncheckedCreateWithoutDocumentInput>
  }

  export type HighlightCreateManyDocumentInputEnvelope = {
    data: HighlightCreateManyDocumentInput | HighlightCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type ChapterCreateWithoutDocumentInput = {
    title: string
    startPage: number
    endPage: number
    pdfPath: string
    htmlPath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChapterUncheckedCreateWithoutDocumentInput = {
    id?: number
    title: string
    startPage: number
    endPage: number
    pdfPath: string
    htmlPath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChapterCreateOrConnectWithoutDocumentInput = {
    where: ChapterWhereUniqueInput
    create: XOR<ChapterCreateWithoutDocumentInput, ChapterUncheckedCreateWithoutDocumentInput>
  }

  export type ChapterCreateManyDocumentInputEnvelope = {
    data: ChapterCreateManyDocumentInput | ChapterCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type AnalyticsUpsertWithWhereUniqueWithoutDocumentInput = {
    where: AnalyticsWhereUniqueInput
    update: XOR<AnalyticsUpdateWithoutDocumentInput, AnalyticsUncheckedUpdateWithoutDocumentInput>
    create: XOR<AnalyticsCreateWithoutDocumentInput, AnalyticsUncheckedCreateWithoutDocumentInput>
  }

  export type AnalyticsUpdateWithWhereUniqueWithoutDocumentInput = {
    where: AnalyticsWhereUniqueInput
    data: XOR<AnalyticsUpdateWithoutDocumentInput, AnalyticsUncheckedUpdateWithoutDocumentInput>
  }

  export type AnalyticsUpdateManyWithWhereWithoutDocumentInput = {
    where: AnalyticsScalarWhereInput
    data: XOR<AnalyticsUpdateManyMutationInput, AnalyticsUncheckedUpdateManyWithoutDocumentInput>
  }

  export type AnalyticsScalarWhereInput = {
    AND?: AnalyticsScalarWhereInput | AnalyticsScalarWhereInput[]
    OR?: AnalyticsScalarWhereInput[]
    NOT?: AnalyticsScalarWhereInput | AnalyticsScalarWhereInput[]
    id?: IntFilter<"Analytics"> | number
    userid?: IntFilter<"Analytics"> | number
    documentid?: IntFilter<"Analytics"> | number
    starttime?: DateTimeFilter<"Analytics"> | Date | string
    endtime?: DateTimeFilter<"Analytics"> | Date | string
    duration?: IntFilter<"Analytics"> | number
    createdat?: DateTimeFilter<"Analytics"> | Date | string
    updatedat?: DateTimeFilter<"Analytics"> | Date | string
  }

  export type UserUpsertWithoutDocumentInput = {
    update: XOR<UserUpdateWithoutDocumentInput, UserUncheckedUpdateWithoutDocumentInput>
    create: XOR<UserCreateWithoutDocumentInput, UserUncheckedCreateWithoutDocumentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentInput, UserUncheckedUpdateWithoutDocumentInput>
  }

  export type UserUpdateWithoutDocumentInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DocumentPreferenceUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentPreferenceWhereUniqueInput
    update: XOR<DocumentPreferenceUpdateWithoutDocumentInput, DocumentPreferenceUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentPreferenceCreateWithoutDocumentInput, DocumentPreferenceUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentPreferenceUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentPreferenceWhereUniqueInput
    data: XOR<DocumentPreferenceUpdateWithoutDocumentInput, DocumentPreferenceUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentPreferenceUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentPreferenceScalarWhereInput
    data: XOR<DocumentPreferenceUpdateManyMutationInput, DocumentPreferenceUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentPreferenceScalarWhereInput = {
    AND?: DocumentPreferenceScalarWhereInput | DocumentPreferenceScalarWhereInput[]
    OR?: DocumentPreferenceScalarWhereInput[]
    NOT?: DocumentPreferenceScalarWhereInput | DocumentPreferenceScalarWhereInput[]
    id?: IntFilter<"DocumentPreference"> | number
    userid?: IntFilter<"DocumentPreference"> | number
    documentid?: IntFilter<"DocumentPreference"> | number
    theme?: StringFilter<"DocumentPreference"> | string
    fontsize?: StringFilter<"DocumentPreference"> | string
    notes?: JsonFilter<"DocumentPreference">
    createdat?: DateTimeFilter<"DocumentPreference"> | Date | string
    updatedat?: DateTimeFilter<"DocumentPreference"> | Date | string
  }

  export type HighlightUpsertWithWhereUniqueWithoutDocumentInput = {
    where: HighlightWhereUniqueInput
    update: XOR<HighlightUpdateWithoutDocumentInput, HighlightUncheckedUpdateWithoutDocumentInput>
    create: XOR<HighlightCreateWithoutDocumentInput, HighlightUncheckedCreateWithoutDocumentInput>
  }

  export type HighlightUpdateWithWhereUniqueWithoutDocumentInput = {
    where: HighlightWhereUniqueInput
    data: XOR<HighlightUpdateWithoutDocumentInput, HighlightUncheckedUpdateWithoutDocumentInput>
  }

  export type HighlightUpdateManyWithWhereWithoutDocumentInput = {
    where: HighlightScalarWhereInput
    data: XOR<HighlightUpdateManyMutationInput, HighlightUncheckedUpdateManyWithoutDocumentInput>
  }

  export type HighlightScalarWhereInput = {
    AND?: HighlightScalarWhereInput | HighlightScalarWhereInput[]
    OR?: HighlightScalarWhereInput[]
    NOT?: HighlightScalarWhereInput | HighlightScalarWhereInput[]
    id?: IntFilter<"Highlight"> | number
    documentid?: IntFilter<"Highlight"> | number
    userid?: IntFilter<"Highlight"> | number
    text?: StringFilter<"Highlight"> | string
    color?: StringFilter<"Highlight"> | string
    pagenumber?: IntFilter<"Highlight"> | number
    coordinates?: JsonFilter<"Highlight">
    createdat?: DateTimeFilter<"Highlight"> | Date | string
    updatedat?: DateTimeFilter<"Highlight"> | Date | string
  }

  export type ChapterUpsertWithWhereUniqueWithoutDocumentInput = {
    where: ChapterWhereUniqueInput
    update: XOR<ChapterUpdateWithoutDocumentInput, ChapterUncheckedUpdateWithoutDocumentInput>
    create: XOR<ChapterCreateWithoutDocumentInput, ChapterUncheckedCreateWithoutDocumentInput>
  }

  export type ChapterUpdateWithWhereUniqueWithoutDocumentInput = {
    where: ChapterWhereUniqueInput
    data: XOR<ChapterUpdateWithoutDocumentInput, ChapterUncheckedUpdateWithoutDocumentInput>
  }

  export type ChapterUpdateManyWithWhereWithoutDocumentInput = {
    where: ChapterScalarWhereInput
    data: XOR<ChapterUpdateManyMutationInput, ChapterUncheckedUpdateManyWithoutDocumentInput>
  }

  export type ChapterScalarWhereInput = {
    AND?: ChapterScalarWhereInput | ChapterScalarWhereInput[]
    OR?: ChapterScalarWhereInput[]
    NOT?: ChapterScalarWhereInput | ChapterScalarWhereInput[]
    id?: IntFilter<"Chapter"> | number
    documentId?: IntFilter<"Chapter"> | number
    title?: StringFilter<"Chapter"> | string
    startPage?: IntFilter<"Chapter"> | number
    endPage?: IntFilter<"Chapter"> | number
    pdfPath?: StringFilter<"Chapter"> | string
    htmlPath?: StringFilter<"Chapter"> | string
    createdAt?: DateTimeFilter<"Chapter"> | Date | string
    updatedAt?: DateTimeFilter<"Chapter"> | Date | string
  }

  export type DocumentCreateWithoutDocumentPreferenceInput = {
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutDocumentInput
    User: UserCreateNestedOneWithoutDocumentInput
    Highlight?: HighlightCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutDocumentPreferenceInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    uploadedbyid: number
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutDocumentPreferenceInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutDocumentPreferenceInput, DocumentUncheckedCreateWithoutDocumentPreferenceInput>
  }

  export type UserCreateWithoutDocumentPreferenceInput = {
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutUserInput
    Document?: DocumentCreateNestedManyWithoutUserInput
    Highlight?: HighlightCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentPreferenceInput = {
    id?: number
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutUserInput
    Document?: DocumentUncheckedCreateNestedManyWithoutUserInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentPreferenceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentPreferenceInput, UserUncheckedCreateWithoutDocumentPreferenceInput>
  }

  export type DocumentUpsertWithoutDocumentPreferenceInput = {
    update: XOR<DocumentUpdateWithoutDocumentPreferenceInput, DocumentUncheckedUpdateWithoutDocumentPreferenceInput>
    create: XOR<DocumentCreateWithoutDocumentPreferenceInput, DocumentUncheckedCreateWithoutDocumentPreferenceInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutDocumentPreferenceInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutDocumentPreferenceInput, DocumentUncheckedUpdateWithoutDocumentPreferenceInput>
  }

  export type DocumentUpdateWithoutDocumentPreferenceInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutDocumentNestedInput
    User?: UserUpdateOneRequiredWithoutDocumentNestedInput
    Highlight?: HighlightUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutDocumentPreferenceInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    uploadedbyid?: IntFieldUpdateOperationsInput | number
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type UserUpsertWithoutDocumentPreferenceInput = {
    update: XOR<UserUpdateWithoutDocumentPreferenceInput, UserUncheckedUpdateWithoutDocumentPreferenceInput>
    create: XOR<UserCreateWithoutDocumentPreferenceInput, UserUncheckedCreateWithoutDocumentPreferenceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentPreferenceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentPreferenceInput, UserUncheckedUpdateWithoutDocumentPreferenceInput>
  }

  export type UserUpdateWithoutDocumentPreferenceInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutUserNestedInput
    Document?: DocumentUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentPreferenceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutUserNestedInput
    Document?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DocumentCreateWithoutHighlightInput = {
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutDocumentInput
    User: UserCreateNestedOneWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutHighlightInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    uploadedbyid: number
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutHighlightInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutHighlightInput, DocumentUncheckedCreateWithoutHighlightInput>
  }

  export type UserCreateWithoutHighlightInput = {
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutUserInput
    Document?: DocumentCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHighlightInput = {
    id?: number
    name: string
    email: string
    passwordhash?: string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutUserInput
    Document?: DocumentUncheckedCreateNestedManyWithoutUserInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHighlightInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHighlightInput, UserUncheckedCreateWithoutHighlightInput>
  }

  export type DocumentUpsertWithoutHighlightInput = {
    update: XOR<DocumentUpdateWithoutHighlightInput, DocumentUncheckedUpdateWithoutHighlightInput>
    create: XOR<DocumentCreateWithoutHighlightInput, DocumentUncheckedCreateWithoutHighlightInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutHighlightInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutHighlightInput, DocumentUncheckedUpdateWithoutHighlightInput>
  }

  export type DocumentUpdateWithoutHighlightInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutDocumentNestedInput
    User?: UserUpdateOneRequiredWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutHighlightInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    uploadedbyid?: IntFieldUpdateOperationsInput | number
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type UserUpsertWithoutHighlightInput = {
    update: XOR<UserUpdateWithoutHighlightInput, UserUncheckedUpdateWithoutHighlightInput>
    create: XOR<UserCreateWithoutHighlightInput, UserUncheckedCreateWithoutHighlightInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHighlightInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHighlightInput, UserUncheckedUpdateWithoutHighlightInput>
  }

  export type UserUpdateWithoutHighlightInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutUserNestedInput
    Document?: DocumentUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHighlightInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordhash?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutUserNestedInput
    Document?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnalyticsCreateWithoutUserInput = {
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
    Document: DocumentCreateNestedOneWithoutAnalyticsInput
  }

  export type AnalyticsUncheckedCreateWithoutUserInput = {
    id?: number
    documentid: number
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type AnalyticsCreateOrConnectWithoutUserInput = {
    where: AnalyticsWhereUniqueInput
    create: XOR<AnalyticsCreateWithoutUserInput, AnalyticsUncheckedCreateWithoutUserInput>
  }

  export type AnalyticsCreateManyUserInputEnvelope = {
    data: AnalyticsCreateManyUserInput | AnalyticsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutUserInput = {
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutDocumentInput
    Chapters?: ChapterUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutUserInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentCreateManyUserInputEnvelope = {
    data: DocumentCreateManyUserInput | DocumentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DocumentPreferenceCreateWithoutUserInput = {
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
    Document: DocumentCreateNestedOneWithoutDocumentPreferenceInput
  }

  export type DocumentPreferenceUncheckedCreateWithoutUserInput = {
    id?: number
    documentid: number
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentPreferenceCreateOrConnectWithoutUserInput = {
    where: DocumentPreferenceWhereUniqueInput
    create: XOR<DocumentPreferenceCreateWithoutUserInput, DocumentPreferenceUncheckedCreateWithoutUserInput>
  }

  export type DocumentPreferenceCreateManyUserInputEnvelope = {
    data: DocumentPreferenceCreateManyUserInput | DocumentPreferenceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HighlightCreateWithoutUserInput = {
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
    Document: DocumentCreateNestedOneWithoutHighlightInput
  }

  export type HighlightUncheckedCreateWithoutUserInput = {
    id?: number
    documentid: number
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type HighlightCreateOrConnectWithoutUserInput = {
    where: HighlightWhereUniqueInput
    create: XOR<HighlightCreateWithoutUserInput, HighlightUncheckedCreateWithoutUserInput>
  }

  export type HighlightCreateManyUserInputEnvelope = {
    data: HighlightCreateManyUserInput | HighlightCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AnalyticsUpsertWithWhereUniqueWithoutUserInput = {
    where: AnalyticsWhereUniqueInput
    update: XOR<AnalyticsUpdateWithoutUserInput, AnalyticsUncheckedUpdateWithoutUserInput>
    create: XOR<AnalyticsCreateWithoutUserInput, AnalyticsUncheckedCreateWithoutUserInput>
  }

  export type AnalyticsUpdateWithWhereUniqueWithoutUserInput = {
    where: AnalyticsWhereUniqueInput
    data: XOR<AnalyticsUpdateWithoutUserInput, AnalyticsUncheckedUpdateWithoutUserInput>
  }

  export type AnalyticsUpdateManyWithWhereWithoutUserInput = {
    where: AnalyticsScalarWhereInput
    data: XOR<AnalyticsUpdateManyMutationInput, AnalyticsUncheckedUpdateManyWithoutUserInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
  }

  export type DocumentUpdateManyWithWhereWithoutUserInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: IntFilter<"Document"> | number
    title?: StringFilter<"Document"> | string
    author?: StringNullableFilter<"Document"> | string | null
    isbn?: StringNullableFilter<"Document"> | string | null
    description?: StringNullableFilter<"Document"> | string | null
    coverurl?: StringNullableFilter<"Document"> | string | null
    filepath?: StringFilter<"Document"> | string
    filehash?: StringFilter<"Document"> | string
    uploadedbyid?: IntFilter<"Document"> | number
    tableofcontents?: JsonFilter<"Document">
    progress?: FloatFilter<"Document"> | number
    lastopened?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdat?: DateTimeFilter<"Document"> | Date | string
    updatedat?: DateTimeFilter<"Document"> | Date | string
  }

  export type DocumentPreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: DocumentPreferenceWhereUniqueInput
    update: XOR<DocumentPreferenceUpdateWithoutUserInput, DocumentPreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<DocumentPreferenceCreateWithoutUserInput, DocumentPreferenceUncheckedCreateWithoutUserInput>
  }

  export type DocumentPreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: DocumentPreferenceWhereUniqueInput
    data: XOR<DocumentPreferenceUpdateWithoutUserInput, DocumentPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type DocumentPreferenceUpdateManyWithWhereWithoutUserInput = {
    where: DocumentPreferenceScalarWhereInput
    data: XOR<DocumentPreferenceUpdateManyMutationInput, DocumentPreferenceUncheckedUpdateManyWithoutUserInput>
  }

  export type HighlightUpsertWithWhereUniqueWithoutUserInput = {
    where: HighlightWhereUniqueInput
    update: XOR<HighlightUpdateWithoutUserInput, HighlightUncheckedUpdateWithoutUserInput>
    create: XOR<HighlightCreateWithoutUserInput, HighlightUncheckedCreateWithoutUserInput>
  }

  export type HighlightUpdateWithWhereUniqueWithoutUserInput = {
    where: HighlightWhereUniqueInput
    data: XOR<HighlightUpdateWithoutUserInput, HighlightUncheckedUpdateWithoutUserInput>
  }

  export type HighlightUpdateManyWithWhereWithoutUserInput = {
    where: HighlightScalarWhereInput
    data: XOR<HighlightUpdateManyMutationInput, HighlightUncheckedUpdateManyWithoutUserInput>
  }

  export type DocumentCreateWithoutChaptersInput = {
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsCreateNestedManyWithoutDocumentInput
    User: UserCreateNestedOneWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutChaptersInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    uploadedbyid: number
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
    Analytics?: AnalyticsUncheckedCreateNestedManyWithoutDocumentInput
    DocumentPreference?: DocumentPreferenceUncheckedCreateNestedManyWithoutDocumentInput
    Highlight?: HighlightUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutChaptersInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutChaptersInput, DocumentUncheckedCreateWithoutChaptersInput>
  }

  export type DocumentUpsertWithoutChaptersInput = {
    update: XOR<DocumentUpdateWithoutChaptersInput, DocumentUncheckedUpdateWithoutChaptersInput>
    create: XOR<DocumentCreateWithoutChaptersInput, DocumentUncheckedCreateWithoutChaptersInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutChaptersInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutChaptersInput, DocumentUncheckedUpdateWithoutChaptersInput>
  }

  export type DocumentUpdateWithoutChaptersInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutDocumentNestedInput
    User?: UserUpdateOneRequiredWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutChaptersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    uploadedbyid?: IntFieldUpdateOperationsInput | number
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type AnalyticsCreateManyDocumentInput = {
    id?: number
    userid: number
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentPreferenceCreateManyDocumentInput = {
    id?: number
    userid: number
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type HighlightCreateManyDocumentInput = {
    id?: number
    userid: number
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type ChapterCreateManyDocumentInput = {
    id?: number
    title: string
    startPage: number
    endPage: number
    pdfPath: string
    htmlPath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnalyticsUpdateWithoutDocumentInput = {
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutAnalyticsNestedInput
  }

  export type AnalyticsUncheckedUpdateWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsUncheckedUpdateManyWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPreferenceUpdateWithoutDocumentInput = {
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutDocumentPreferenceNestedInput
  }

  export type DocumentPreferenceUncheckedUpdateWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPreferenceUncheckedUpdateManyWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HighlightUpdateWithoutDocumentInput = {
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutHighlightNestedInput
  }

  export type HighlightUncheckedUpdateWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HighlightUncheckedUpdateManyWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userid?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChapterUpdateWithoutDocumentInput = {
    title?: StringFieldUpdateOperationsInput | string
    startPage?: IntFieldUpdateOperationsInput | number
    endPage?: IntFieldUpdateOperationsInput | number
    pdfPath?: StringFieldUpdateOperationsInput | string
    htmlPath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChapterUncheckedUpdateWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    startPage?: IntFieldUpdateOperationsInput | number
    endPage?: IntFieldUpdateOperationsInput | number
    pdfPath?: StringFieldUpdateOperationsInput | string
    htmlPath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChapterUncheckedUpdateManyWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    startPage?: IntFieldUpdateOperationsInput | number
    endPage?: IntFieldUpdateOperationsInput | number
    pdfPath?: StringFieldUpdateOperationsInput | string
    htmlPath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsCreateManyUserInput = {
    id?: number
    documentid: number
    starttime: Date | string
    endtime: Date | string
    duration: number
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentCreateManyUserInput = {
    id?: number
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    coverurl?: string | null
    filepath: string
    filehash: string
    tableofcontents: JsonNullValueInput | InputJsonValue
    progress: number
    lastopened?: Date | string | null
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type DocumentPreferenceCreateManyUserInput = {
    id?: number
    documentid: number
    theme: string
    fontsize: string
    notes: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type HighlightCreateManyUserInput = {
    id?: number
    documentid: number
    text: string
    color: string
    pagenumber: number
    coordinates: JsonNullValueInput | InputJsonValue
    createdat?: Date | string
    updatedat?: Date | string
  }

  export type AnalyticsUpdateWithoutUserInput = {
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateOneRequiredWithoutAnalyticsNestedInput
  }

  export type AnalyticsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    starttime?: DateTimeFieldUpdateOperationsInput | Date | string
    endtime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUpdateManyWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Analytics?: AnalyticsUncheckedUpdateManyWithoutDocumentNestedInput
    DocumentPreference?: DocumentPreferenceUncheckedUpdateManyWithoutDocumentNestedInput
    Highlight?: HighlightUncheckedUpdateManyWithoutDocumentNestedInput
    Chapters?: ChapterUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverurl?: NullableStringFieldUpdateOperationsInput | string | null
    filepath?: StringFieldUpdateOperationsInput | string
    filehash?: StringFieldUpdateOperationsInput | string
    tableofcontents?: JsonNullValueInput | InputJsonValue
    progress?: FloatFieldUpdateOperationsInput | number
    lastopened?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPreferenceUpdateWithoutUserInput = {
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateOneRequiredWithoutDocumentPreferenceNestedInput
  }

  export type DocumentPreferenceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPreferenceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    fontsize?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HighlightUpdateWithoutUserInput = {
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
    Document?: DocumentUpdateOneRequiredWithoutHighlightNestedInput
  }

  export type HighlightUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HighlightUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentid?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    pagenumber?: IntFieldUpdateOperationsInput | number
    coordinates?: JsonNullValueInput | InputJsonValue
    createdat?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedat?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}