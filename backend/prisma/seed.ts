import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const demoEmail = 'demo@kilimatolyesi.com.tr';

  const existingUser = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (existingUser) {
    console.log('Demo kullanıcı zaten mevcut, seed atlanıyor.');
    return;
  }

  const passwordHash = await bcrypt.hash('demo123456', 12);

  await prisma.user.create({
    data: {
      email: demoEmail,
      password: passwordHash,
      name: 'Ayşe Kilim',
      role: 'admin',
    },
  });

  const workshop1 = await prisma.workshop.create({
    data: {
      name: 'Göreme Dokuma Atölyesi',
      city: 'Nevşehir',
      address: 'Aydınlı Sokak No:12, Göreme',
      foundedYear: 1987,
      status: 'active',
    },
  });

  const workshop2 = await prisma.workshop.create({
    data: {
      name: 'Hereke El Dokuma Evi',
      city: 'Kocaeli',
      address: 'Sakıp Sabancı Caddesi No:45, Hereke',
      foundedYear: 1995,
      status: 'active',
    },
  });

  const workshop3 = await prisma.workshop.create({
    data: {
      name: 'Kars Yün İşleme Atölyesi',
      city: 'Kars',
      address: 'Kale Caddesi No:8',
      foundedYear: 2003,
      status: 'renovating',
    },
  });

  const weaver1 = await prisma.weaver.create({
    data: {
      name: 'Fatma Yıldırım',
      skillLevel: 'master',
      phone: '+90 532 111 2233',
      workshopId: workshop1.id,
      status: 'active',
    },
  });

  const weaver2 = await prisma.weaver.create({
    data: {
      name: 'Mehmet Usta',
      skillLevel: 'journeyman',
      phone: '+90 533 444 5566',
      workshopId: workshop1.id,
      status: 'active',
    },
  });

  const weaver3 = await prisma.weaver.create({
    data: {
      name: 'Zeynep Akın',
      skillLevel: 'apprentice',
      phone: '+90 534 777 8899',
      workshopId: workshop2.id,
      status: 'active',
    },
  });

  const loom1 = await prisma.loom.create({
    data: {
      code: 'TC-001',
      widthCm: 180,
      loomType: 'Dikey Dokuma',
      status: 'active',
      workshopId: workshop1.id,
    },
  });

  const loom2 = await prisma.loom.create({
    data: {
      code: 'TC-002',
      widthCm: 220,
      loomType: 'Yatay Dokuma',
      status: 'active',
      workshopId: workshop1.id,
    },
  });

  const loom3 = await prisma.loom.create({
    data: {
      code: 'HRK-001',
      widthCm: 150,
      loomType: 'Hereke İpek',
      status: 'maintenance',
      workshopId: workshop2.id,
    },
  });

  const pattern1 = await prisma.pattern.create({
    data: {
      name: 'Göreme Geometrik',
      region: 'Kapadokya',
      motifType: 'Geometrik',
      colorPalette: 'Kızıl, lacivert, krem',
      knotDensity: 120,
      widthCm: 120,
      lengthCm: 180,
    },
  });

  const pattern2 = await prisma.pattern.create({
    data: {
      name: 'Konya Mevlana',
      region: 'Konya',
      motifType: 'Sembolik',
      colorPalette: 'Bordo, altın, siyah',
      knotDensity: 100,
      widthCm: 100,
      lengthCm: 160,
    },
  });

  const pattern3 = await prisma.pattern.create({
    data: {
      name: 'Kars Kaz Evi',
      region: 'Kars',
      motifType: 'Hayvan Figürlü',
      colorPalette: 'Kırmızı, beyaz, kahve',
      knotDensity: 80,
      widthCm: 90,
      lengthCm: 150,
    },
  });

  await prisma.yarnBatch.createMany({
    data: [
      { batchCode: 'IPK-2026-01', fiberType: 'İpek', color: 'Krem', weightKg: 45.5, supplier: 'Bursa İpek Ticaret', unitCost: 850 },
      { batchCode: 'YUN-2026-02', fiberType: 'Yün', color: 'Kırmızı', weightKg: 120, supplier: 'Kars Yün Kooperatifi', unitCost: 220 },
      { batchCode: 'PAM-2026-03', fiberType: 'Pamuk', color: 'Lacivert', weightKg: 85, supplier: 'Denizli Dokuma', unitCost: 95 },
    ],
  });

  const now = new Date();
  const nextMonth = new Date(now.getTime() + 30 * 86400000);
  const lastWeek = new Date(now.getTime() - 7 * 86400000);

  const order1 = await prisma.weavingOrder.create({
    data: {
      orderCode: 'KC-2026-001',
      clientName: 'İstanbul Halı Galerisi',
      patternId: pattern1.id,
      loomId: loom1.id,
      widthCm: 120,
      lengthCm: 180,
      status: 'in_progress',
      deadline: nextMonth,
    },
  });

  const order2 = await prisma.weavingOrder.create({
    data: {
      orderCode: 'KC-2026-002',
      clientName: 'Ankara El Sanatları Evi',
      patternId: pattern2.id,
      loomId: loom2.id,
      widthCm: 100,
      lengthCm: 160,
      status: 'pending',
      deadline: nextMonth,
    },
  });

  const order3 = await prisma.weavingOrder.create({
    data: {
      orderCode: 'KC-2025-089',
      clientName: 'İzmir Antikacı',
      patternId: pattern3.id,
      loomId: loom1.id,
      widthCm: 90,
      lengthCm: 150,
      status: 'completed',
      deadline: lastWeek,
    },
  });

  await prisma.productionRun.createMany({
    data: [
      { runDate: lastWeek, hoursWorked: 8, cmCompleted: 12.5, orderId: order1.id, weaverId: weaver1.id, status: 'completed' },
      { runDate: now, hoursWorked: 6, cmCompleted: 8.2, orderId: order1.id, weaverId: weaver2.id, status: 'in_progress' },
      { runDate: lastWeek, hoursWorked: 7, cmCompleted: 150, orderId: order3.id, weaverId: weaver1.id, status: 'completed' },
    ],
  });

  await prisma.qualityInspection.createMany({
    data: [
      { inspectionDate: lastWeek, score: 92, defectCount: 1, notes: 'Kenar düğümü hafif gevşek', orderId: order3.id, result: 'pass' },
      { inspectionDate: now, score: 78, defectCount: 3, notes: 'Renk geçişinde ton farkı', orderId: order1.id, result: 'review' },
    ],
  });

  await prisma.client.createMany({
    data: [
      { name: 'Ahmet Demir', company: 'İstanbul Halı Galerisi', city: 'İstanbul', phone: '+90 212 555 0101', email: 'ahmet@istanbulhali.com' },
      { name: 'Selin Kaya', company: 'Ankara El Sanatları Evi', city: 'Ankara', phone: '+90 312 555 0202', email: 'selin@elsanatlari.com.tr' },
      { name: 'Murat Öz', company: 'İzmir Antikacı', city: 'İzmir', phone: '+90 232 555 0303', email: 'murat@izmirantik.com' },
    ],
  });

  await prisma.shipment.createMany({
    data: [
      { trackingCode: 'TR-KC-2025-089', destination: 'İzmir, Alsancak', weightKg: 8.5, shipDate: lastWeek, orderId: order3.id, status: 'delivered' },
      { trackingCode: 'TR-KC-2026-P01', destination: 'İstanbul, Nişantaşı', weightKg: 0, shipDate: now, orderId: order1.id, status: 'pending' },
    ],
  });

  console.log('KilimCraft demo verisi oluşturuldu.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
