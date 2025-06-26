import { Module } from '@nestjs/common';
import { PromptGeneratorService } from './prompt-generator.service';

@Module({
  providers: [PromptGeneratorService]
})
export class PromptGeneratorModule {}
