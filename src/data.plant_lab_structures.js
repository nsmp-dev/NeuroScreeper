/**
 * Holds references to the labs and storage in a plant, used for passing between functions
 * @class PlantLabStructures
 */
class PlantLabStructures {
    /**
     * Creates a PlantLabStructures object
     * @param {StructureLab} input_lab_1 - the first input lab
     * @param {StructureLab} input_lab_2 - the second input lab
     * @param {StructureLab} output_lab - the output lab
     * @param {StructureStorage} storage - the storage
     */
    constructor(input_lab_1, input_lab_2, output_lab, storage) {
        /**
         * the first input lab
         * @type {StructureLab}
         */
        this.input_lab_1 = input_lab_1;
        /**
         * the second input lab
         * @type {StructureLab}
         */
        this.input_lab_2 = input_lab_2;
        /**
         * the output lab
         * @type {StructureLab}
         */
        this.output_lab = output_lab;
        /**
         * the storage
         * @type {StructureStorage}
         */
        this.storage = storage;
    }
}

// export the PlantLabStructures class
global.PlantLabStructures = PlantLabStructures;