-- CreateTable
CREATE TABLE `Document` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `customerId` VARCHAR(191) NULL,
    `totalVolume` DOUBLE NOT NULL,
    `totalWeight` DOUBLE NOT NULL,
    `avgRatio` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `length` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `kgPerUnit` DOUBLE NOT NULL,
    `customerCode` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `productRoutes` VARCHAR(191) NOT NULL,
    `shop` VARCHAR(191) NULL,
    `expense` DOUBLE NULL,
    `currency` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,
    `documentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
