import { getSession } from "./get-session";
import { Payload } from "6_shared/types";
import { db } from '6_shared/api'

export type Context = {
    session: Payload | null;
    db: typeof db;
};

export async function createContext({
    req,
}: {
    req: Request;
}): Promise<Context> {
    const session = await getSession(req);

    return {
        session,
        db,
    };
}