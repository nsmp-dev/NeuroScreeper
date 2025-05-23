/**
 * Bootloader file responsible for requiring and loading all necessary classes and prototypes.
 * This includes data classes, logic objects, global utilities, prototypes, and role definitions
 * needed for the AI to function properly_ Acts as a central loading point for the entire codebase.
 * @file
 */
require('global_config');
require('data_construction_plan');
require('data_creep_memory');
require('data_main_memory');
require('data_mineral_plan');
require('data_mineral_population');
require('data_observer_log');
require('data_plant_data');
require('data_plant_factory_structures');
require('data_plant_lab_structures');
require('data_point');
require('data_popup_message');
require('data_power_squad');
require('data_power_squad_creeps');
require('data_power_squad_population');
require('data_production');
require('data_reaction');
require('data_role');
require('data_room_data');
require('data_room_plans');
require('data_room_plans_factory');
require('data_room_population');
require('data_source_plan');
require('data_source_population');
require('data_tasks');
require('data_timer_entry');
require('data_timer_log');
require('global_timer');
require('global_util');
require('global_visualizer');
require('neuro_operator');
require('neuro_plant');
require('neuro_power');
require('neuro_power_squad');
require('neuro_room');
require('neuro_screeper');
require('neuro_task');
require('prototype_creep');
require('prototype_observer');
require('prototype_power_creep');
require('prototype_room');
require('prototype_terminal');
require('prototype_tower');
require('role_attacker');
require('role_builder');
require('role_claimer');
require('role_commodity_collector');
require('role_driller');
require('role_healer');
require('role_mineral_driller');
require('role_mineral_transporter');
require('role_power_attacker');
require('role_power_healer');
require('role_power_transporter');
require('role_queen');
require('role_repairer');
require('role_scout');
require('role_transporter');
require('role_upgrader');