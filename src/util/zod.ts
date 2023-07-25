import { AnyZodObject, ZodError, z } from 'zod';

// Helper for parsing Zod schemas in Express routes with integrated validation
// See: https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p#comment-1kn87
export async function zParse<T extends AnyZodObject>(
    schema: T,
    req: Express.Request,
): Promise<z.infer<T>> {
    try {
        return schema.parseAsync(req);
    } catch (error) {
        if (error instanceof ZodError) {
            // TODO: Wrap this in a custom error
            throw error;
        }
        throw Error(JSON.stringify(error));
    }
}
