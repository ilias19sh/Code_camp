-- Création de la table Utilisateur
CREATE TABLE Utilisateur (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pseudo VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amis UUID[] -- Liste d'ID d'amis
);

-- Création de la table Signalement
CREATE TABLE Signalement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    categorie VARCHAR(255) NOT NULL,
    localisation VARCHAR(255),
    statut VARCHAR(50) DEFAULT 'en attente' CHECK (statut IN ('en attente', 'examiné', 'résolu')),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    utilisateur_id UUID NOT NULL, -- Référence à l'utilisateur
    preuves JSONB, -- Preuves sous forme de JSON
    CONSTRAINT fk_utilisateur
        FOREIGN KEY (utilisateur_id)
        REFERENCES Utilisateur (id)
        ON DELETE CASCADE
);

-- Création de la table Preuve (si tu souhaites garder une table externe pour les preuves)
CREATE TABLE Preuve (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    commentaire TEXT,
    signalement_id UUID NOT NULL, -- Référence au signalement
    CONSTRAINT fk_signalement
        FOREIGN KEY (signalement_id)
        REFERENCES Signalement (id)
        ON DELETE CASCADE
);

