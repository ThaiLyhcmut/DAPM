import { Test, TestingModule } from '@nestjs/testing';
import { MailserverService } from './mailserver.service';

describe('MailserverService', () => {
  let service: MailserverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailserverService],
    }).compile();

    service = module.get<MailserverService>(MailserverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
