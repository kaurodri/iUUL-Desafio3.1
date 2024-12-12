const ModelPaciente = (PacienteNovo, sequelize, DataTypes) => {
    PacienteNovo.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            cpf: { type: DataTypes.STRING(11), allowNull: false },
            nome: { type: DataTypes.STRING(100), allowNull: false },
            dataNascimento: { type: DataTypes.STRING(10), allowNull: false },
        },
        {
            sequelize,
            indexes: [{ unique: true, fields: ["cpf"] }],
        }
    );
};

export default ModelPaciente;
