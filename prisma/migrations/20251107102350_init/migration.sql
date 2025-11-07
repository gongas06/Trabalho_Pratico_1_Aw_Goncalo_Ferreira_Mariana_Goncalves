-- CreateTable
CREATE TABLE "Adotante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "idade" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'pendente',
    "adotanteId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "Adocao_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Adotante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adocao_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Adotante_email_key" ON "Adotante"("email");
