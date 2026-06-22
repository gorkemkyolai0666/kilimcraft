-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'workshop_manager', 'master_weaver', 'quality_inspector', 'sales_coordinator');

-- CreateEnum
CREATE TYPE "WorkshopStatus" AS ENUM ('active', 'inactive', 'renovating');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('apprentice', 'journeyman', 'master');

-- CreateEnum
CREATE TYPE "WeaverStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "LoomStatus" AS ENUM ('active', 'maintenance', 'idle');

-- CreateEnum
CREATE TYPE "WeavingOrderStatus" AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "ProductionRunStatus" AS ENUM ('in_progress', 'completed', 'paused');

-- CreateEnum
CREATE TYPE "InspectionResult" AS ENUM ('pass', 'fail', 'review');

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('pending', 'shipped', 'delivered');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'workshop_manager',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "foundedYear" INTEGER NOT NULL,
    "status" "WorkshopStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weaver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "skillLevel" "SkillLevel" NOT NULL DEFAULT 'apprentice',
    "phone" TEXT NOT NULL,
    "workshopId" TEXT NOT NULL,
    "status" "WeaverStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Weaver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loom" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "widthCm" DOUBLE PRECISION NOT NULL,
    "loomType" TEXT NOT NULL,
    "status" "LoomStatus" NOT NULL DEFAULT 'active',
    "workshopId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Loom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pattern" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "motifType" TEXT NOT NULL,
    "colorPalette" TEXT NOT NULL,
    "knotDensity" INTEGER NOT NULL,
    "widthCm" DOUBLE PRECISION NOT NULL,
    "lengthCm" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Pattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YarnBatch" (
    "id" TEXT NOT NULL,
    "batchCode" TEXT NOT NULL,
    "fiberType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "unitCost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "YarnBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeavingOrder" (
    "id" TEXT NOT NULL,
    "orderCode" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "patternId" TEXT NOT NULL,
    "loomId" TEXT NOT NULL,
    "widthCm" DOUBLE PRECISION NOT NULL,
    "lengthCm" DOUBLE PRECISION NOT NULL,
    "status" "WeavingOrderStatus" NOT NULL DEFAULT 'pending',
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "WeavingOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionRun" (
    "id" TEXT NOT NULL,
    "runDate" TIMESTAMP(3) NOT NULL,
    "hoursWorked" DOUBLE PRECISION NOT NULL,
    "cmCompleted" DOUBLE PRECISION NOT NULL,
    "orderId" TEXT NOT NULL,
    "weaverId" TEXT NOT NULL,
    "status" "ProductionRunStatus" NOT NULL DEFAULT 'in_progress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ProductionRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualityInspection" (
    "id" TEXT NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "defectCount" INTEGER NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "orderId" TEXT NOT NULL,
    "result" "InspectionResult" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "QualityInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "trackingCode" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "shipDate" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Loom_code_key" ON "Loom"("code");
CREATE UNIQUE INDEX "YarnBatch_batchCode_key" ON "YarnBatch"("batchCode");
CREATE UNIQUE INDEX "WeavingOrder_orderCode_key" ON "WeavingOrder"("orderCode");
CREATE UNIQUE INDEX "Shipment_trackingCode_key" ON "Shipment"("trackingCode");

-- AddForeignKey
ALTER TABLE "Weaver" ADD CONSTRAINT "Weaver_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Loom" ADD CONSTRAINT "Loom_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "WeavingOrder" ADD CONSTRAINT "WeavingOrder_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "Pattern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "WeavingOrder" ADD CONSTRAINT "WeavingOrder_loomId_fkey" FOREIGN KEY ("loomId") REFERENCES "Loom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ProductionRun" ADD CONSTRAINT "ProductionRun_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "WeavingOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ProductionRun" ADD CONSTRAINT "ProductionRun_weaverId_fkey" FOREIGN KEY ("weaverId") REFERENCES "Weaver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "QualityInspection" ADD CONSTRAINT "QualityInspection_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "WeavingOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "WeavingOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
