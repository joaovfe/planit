import { Repository } from '@/core/http/repository';
import { Country } from '../domain/entities/country.entity';



export class CountryRepository extends Repository {
    static instance: CountryRepository;

    constructor() {
        super('paises');

        if (CountryRepository.instance) {
            return CountryRepository.instance;
        }

        CountryRepository.instance = this;
    }

    public async list(): Promise<Country[]> {
        const { status, data } = await this.http.get<Country[]>(``);

        if (this.isOK(status)) return data;

        throw new Error('Ops, algo inesperado aconteceu!');
    }
}