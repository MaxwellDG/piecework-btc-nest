import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum Chain {
    Bitcoin = "Bitcoin",
    Ethereum = "Ethereum",
    Binance = "Binance",
    Solana = "Solana",
    Cardano = "Cardano"
}


@Entity()
export default class Coin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, unique: true })
    mintAddress?: string;

    @Column()
    symbol: string;

    @Column()
    name: string;

    @Column()
    chain: Chain;

    constructor(symbol: string, name: string, chain: Chain){
        this.symbol = symbol;
        this.name = name;
        this.chain = chain;
    }
}