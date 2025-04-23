module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');

    // Project configuration.
    grunt.initConfig({
        screeps: {
            options: {
                email: '<your email>',
                token: '<your auth token>',
                branch: 'default',
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
};