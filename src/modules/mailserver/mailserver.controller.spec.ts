import { Test, TestingModule } from '@nestjs/testing';
import { MailserverController } from './mailserver.controller';
import { MailserverService } from './mailserver.service';

describe('MailserverController', () => {
  let controller: MailserverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailserverController],
      providers: [MailserverService],
    }).compile();

    controller = module.get<MailserverController>(MailserverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
