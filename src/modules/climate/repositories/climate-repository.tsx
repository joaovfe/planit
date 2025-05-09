import { Repository } from '@/core/http/repository';
import { Climate } from '../domain/entities/climate.entity';



export class ClimateRepository extends Repository {
    static instance: ClimateRepository;

    constructor() {
        super('climate');

        if (ClimateRepository.instance) {
            return ClimateRepository.instance;
        }

        ClimateRepository.instance = this;
    }

    public async list(): Promise<Climate[]> {
        const { status, data } = await this.http.get<Climate[]>(``);

        if (this.isOK(status)) return data;

        throw new Error('Ops, algo inesperado aconteceu!');
    }
}