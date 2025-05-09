module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    let config = require('./.screeps.json');

    grunt.initConfig({
        screeps: {
            options: {
                email: config.email,
                token: config.token,
                branch: config.branch,
                ptr: config.ptr,
            },
            dist: {
                src: ['dist/*.js'],
            },
        },
        clean: {
            'dist': ['dist'],
        },
        copy: {
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        return dest + src.replace(/\//g, '_');
                    },
                }],
            },
        },
    });
    grunt.registerTask('default',  ['clean', 'copy:screeps', 'screeps']);
};