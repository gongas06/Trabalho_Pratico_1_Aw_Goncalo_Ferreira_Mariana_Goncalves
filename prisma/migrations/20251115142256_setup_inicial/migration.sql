/*
  Warnings:

  - You are about to alter the column `estado` on the `Adocao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Adocao` ADD COLUMN `notas` VARCHAR(191) NULL,
    MODIFY `estado` ENUM('PENDENTE', 'APROVADA', 'RECUSADA', 'CONCLUIDA') NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE `Animal` ADD COLUMN `categoriaId` INTEGER NULL,
    ADD COLUMN `descricao` VARCHAR(191) NULL,
    ADD COLUMN `favorito` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `foto` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partilha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `animalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partilha` ADD CONSTRAINT `Partilha_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partilha` ADD CONSTRAINT `Partilha_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
