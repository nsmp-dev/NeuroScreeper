/**
 * Holds references to the factory and the storage for passing between functions
 * @class PlantFactoryStructures
 */
class PlantFactoryStructures {
    /**
     * Creates a new PlantFactoryStructures object
     * @param {StructureFactory} factory - The factory object
     * @param {StructureStorage} storage - The storage object
     */
    constructor(factory, storage) {
        /**
         * The factory object
         * @type {StructureFactory}
         */
        this.factory = factory;
        /**
         * The storage object
         * @type {StructureStorage}
         */
        this.storage = storage;
    }
}

// export the PlantFactoryStructures class
global.PlantFactoryStructures = PlantFactoryStructures;