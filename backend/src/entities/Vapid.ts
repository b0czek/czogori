import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Vapid {
    @PrimaryKey()
    id!: number;

    @Property({ type: "string" })
    publicKey: string;

    @Property({ type: "string" })
    privateKey: string;

    @Property({ type: "string" })
    email: string;
}
