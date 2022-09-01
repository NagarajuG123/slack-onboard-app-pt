import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SeederService {
    constructor(private _logger: Logger) {}

    async seed() {
        this._logger.log('Started seeding...', 'SeederService');
    }
}