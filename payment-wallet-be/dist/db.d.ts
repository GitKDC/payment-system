import mongoose from 'mongoose';
declare const connectDB: () => Promise<void>;
interface UserI {
    email: string;
    password: string | number;
    age?: number;
    firstName: string;
    lastName: string;
}
export declare const User: mongoose.Model<UserI, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, UserI, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserI & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<UserI, mongoose.Model<UserI, any, any, any, mongoose.Document<unknown, any, UserI, any, mongoose.DefaultSchemaOptions> & UserI & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, UserI>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserI, mongoose.Document<unknown, {}, UserI, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserI & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    email?: mongoose.SchemaDefinitionProperty<string, UserI, mongoose.Document<unknown, {}, UserI, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserI & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string | number, UserI, mongoose.Document<unknown, {}, UserI, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserI & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    age?: mongoose.SchemaDefinitionProperty<number | undefined, UserI, mongoose.Document<unknown, {}, UserI, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserI & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    firstName?: mongoose.SchemaDefinitionProperty<string, UserI, mongoose.Document<unknown, {}, UserI, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserI & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lastName?: mongoose.SchemaDefinitionProperty<string, UserI, mongoose.Document<unknown, {}, UserI, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserI & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, UserI>, UserI>;
export default connectDB;
//# sourceMappingURL=db.d.ts.map