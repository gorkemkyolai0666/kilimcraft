import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopsService } from './workshops.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WorkshopsService', () => {
  let service: WorkshopsService;
  let prisma: Record<string, Record<string, jest.Mock>>;

  beforeEach(async () => {
    prisma = {
      workshop: {
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkshopsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<WorkshopsService>(WorkshopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all records', async () => {
    const result = await service.findAll();
    expect(prisma.workshop.findMany).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should create a record', async () => {
    const dto = { name: 'Test Silo' } as any;
    prisma.workshop.create.mockResolvedValue({ id: '1', ...dto });
    const result = await service.create(dto);
    expect(prisma.workshop.create).toHaveBeenCalled();
    expect(result.id).toBe('1');
  });
});
