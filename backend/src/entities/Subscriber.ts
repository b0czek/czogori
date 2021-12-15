import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Subscriber {
    @PrimaryKey()
    id!: number;

    @Property({ type: "date" })
    subscription_date = new Date();

    @Property({ type: "string" })
    payload: string;
}
