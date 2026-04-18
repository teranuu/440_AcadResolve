import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    acadreso_api: {
                        table: 'sys_ws_definition'
                        id: '84390c78351a469caef50dfe08b5adbf'
                        deleted: true
                    }
                    acadresolve_api: {
                        table: 'sys_ws_definition'
                        id: '87165a9073d444c6843cc6a0270299de'
                    }
                    ai_assessment_route: {
                        table: 'sys_ws_operation'
                        id: '07abbe0f30db476ab338074671d112ae'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'd6d40cb911224d7b987386c520458da3'
                    }
                    calculate_fee_br: {
                        table: 'sys_script'
                        id: 'f1d9f171c3a34e02828625497cc1239c'
                    }
                    calculate_fee_route: {
                        table: 'sys_ws_operation'
                        id: 'aa26f85820d94d5ebdbd1d9ec44ea7cf'
                    }
                    create_incident_route: {
                        table: 'sys_ws_operation'
                        id: 'a9a804435e9d4161897f757e6798f8c1'
                    }
                    get_incident_route: {
                        table: 'sys_ws_operation'
                        id: '34f18e0e070e4d7b84bb87bc8e1c6350'
                    }
                    initiate_payment_route: {
                        table: 'sys_ws_operation'
                        id: '9131260e6fcb441d9846048054e1ec60'
                    }
                    list_incidents_route: {
                        table: 'sys_ws_operation'
                        id: '4654163915f64b9881dc94dfa1042714'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '7a2ff124197442e7ad44a1e466570c2c'
                    }
                    'src_server_academic-resolve-api_js': {
                        table: 'sys_module'
                        id: 'b12cebf826254752998dd242f7c7ffc5'
                    }
                    'src_server_fee-calculator_js': {
                        table: 'sys_module'
                        id: 'ee191b20f36c494999bbe5c964291520'
                    }
                    'src_server_incident-service_js': {
                        table: 'sys_module'
                        id: '310d9375301f4e25b78a221cdeb57976'
                    }
                    submit_approval_route: {
                        table: 'sys_ws_operation'
                        id: 'c667325d3ca6450b9b20b621a8a5fed4'
                    }
                    update_incident_route: {
                        table: 'sys_ws_operation'
                        id: 'da449ba6cf314b439cd076cb437d966c'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '014caca0d5c64f729886291d7b068fa7'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '01e819d84477490b932827049817b752'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'incident_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '0402002a502345e48e5263d96a0d74b3'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '040bfae041884c8593d95b53b61aee94'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '098e3e6d01b44bbbb4966811a6bbbd7a'
                        key: {
                            name: 'x_1997678_acadreso/main.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0b8a223f7fa94618a56d29bcae386673'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0b8f0e3024754e1cb7381acc3dae7696'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'other'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '0d1dc6194fe9498aafdc5023e9511972'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1023db234fef4dc38deab1adad2e1382'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1135fd836bb04d658483c7baeebf4b9a'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '16de18de69c441689cbaba918e03917e'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '1720cd46ba844df7a61a241fb795eee8'
                        key: {
                            name: 'x_1997678_acadreso/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '17663fb1844a49f79e7f87b3da6919a3'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'student_id'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '18dd0a27cf3d414b8f0db227d6f4243b'
                        key: {
                            endpoint: 'x_1997678_acadreso_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1a33e71e4ef649f68b0ac3f5c06908c2'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d6918f54bda4d34a82a750e0e834d15'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e248e6e25764b0aa0fe4afda19afa9b'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            value: 'fixed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e54f82fbba74cfc933ecc8c1dd96c17'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_title'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e704fa4696f498ebd04b92c1514efef'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '243063778d134b1db319f3c4d2998bb8'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_percentage'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '28f218c1696248f0aac4ef86bf6d9ca5'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'assessment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '29690d029def4c908edca546734a987c'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2ad403225991419abca11a16da699675'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2bc206499e9b477394c0cdf4dadaf4d7'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'recommended_damage_level'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2bec617eb1bb4cba800cbe7d8c91be21'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'active'
                            value: 'false'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '2c694e9450494064a3a1413456f92ff1'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2cd29ac46cd04931b783217a2466f1e1'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2cf15b21653342988b24452d50bfb6c6'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '324eb1f83b014fe296a8ba62dac68371'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'incident_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '326067cfdc85416793797d7cef4056a0'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '347408477dc24abbb2e9ad993250799f'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'resolution_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '349c20c592a44b438a257aca292ad78a'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36ac72c9c7cf4ee4b77db603328061c5'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'pending_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39c3ec586a5c40dcbd3dac9e3eac6eec'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'open'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3c456c43f66b4363b51576f888a5d6dd'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3dc5dceeb46a4102bc9496724ae6a1b1'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e6c4beb5cc3429098cae561420b2dbd'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '405e230c5a3744f2bbbbc8e1818b7b69'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'active'
                            value: 'true'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '457cf9e6098b4ceaaff5e5d1b05768a0'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b26a351ecf34877a23af1003b424f5a'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4baa054330874376ae819e2101924995'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_percentage'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '50a76ce6ccff48e1840cbeae6101bd25'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '50c966053e8a479da24a394fd5c3277f'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5505100b716444699427e8c6fac25124'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_isbn'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '553831b0d1894b8ab3a26c55e2b6ffc9'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b5f1c67e6b44537b509eb8ff43749d7'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_notes'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '62bf3b459c554eaf82c91a45190844f7'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '639cd284b3cb455194773a92f253c07a'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'resolved_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '64687e8e623a4430a18b33defa4bbcbb'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '652c865362284009bb24c54b847de956'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '67d9a3edeac948ce9953621c8dceca0d'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'resolution_notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '68ef2c2f74c94aa49d9f2e85dad4629c'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'ai_assessment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6a59c4454f3949308808cab55f4e9a9a'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'lost'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6b0cb768a2bc493495fcc6f90e5f469e'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '745f3d87b2c24fc0bda3206040cfc3c3'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'recommended_fee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7968706eef6d4173adb2ef135d379283'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7e38eb6a22d840db9f9403b3539702bb'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7f074e8088604e84bad1c0c4594fed97'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'ai_assessment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7f660d2f9907408094c6fb6036f38bf4'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'student_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80b5d7e5959342a9900f875a193766f8'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8350ed701ef54e0c95d48408054f61fd'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8653952a12304e2b9934178386271168'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '880d99de7dc94e3387e901cbc3244ea0'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'torn_pages'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '88592d26bf78427dbc8431e06d0e1f60'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso.student'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '89ed41002349448cba3443b93f1a74ba'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approver_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '8e09a67a70e044a588da8fe8b32a1297'
                        deleted: true
                        key: {
                            category: 'x_1997678_acadreso_book_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '90838c8af3df4e46b4db88b853164441'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'replaced'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91e2e8d5c68d4d1489f1f1a4d9079698'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '956ce486d57641209e06325144ad7c48'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '97416ef5816847e99a1d03d9d8bb48e1'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'water_damage'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97c56a5df596495ba1c2740fbbd6521c'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'incident_date'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '999c0604063548ebaa3117745a2bbad3'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '99b872e726224f8eb13ef076fa755de3'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '99fabce47bea434db5829b755cc6f3d4'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9bda53e466ec4105b213411f50133b8c'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            value: 'percentage'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c1c4d66891b4ae99c0399de186377b1'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9e06dd698d674293971d1a88b89a0aae'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9f3ff48165a446d19b0ceeb22c665459'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a63aa4d1a51b4fe490ec0506b66a559e'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'calculated_fee'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a6c0dc6cb8bc4130af5d224f0d8eb2e9'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ac53dcae338f46938b0051aa6e710702'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae3dc67e982c4e11ac1786877f2b001d'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b20d4a9d1adc4d20baf7ac9d54390f43'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'disputed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2c97467b09e40eab6290512693089a3'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'calculated_fee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b4e9907ee3254becacdcab78fd40d694'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_value'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'b78365b8c60c4578825293180e9c8859'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bf67e66c0f9c40eaacf1043cc249f90d'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'total'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c08f53cf759f46d4a9b5745aba89be12'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1b2599422e54604bd560482f9ff8c89'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4dc0a162089471e994bec31aec13a16'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'recommended_damage_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd150058f245748f68ff216ef4b440622'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3ccdda62f7447eabe793fd8e49e35ce'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'resolved_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4c18bcb63ca44a399d0289918edfe7c'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approver_id'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'd5daa59066654f949a7442efb527f496'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso.admin'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd6947afd221441858f09923fd73fd789'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dd331085cef740fd92402309e70f5a7f'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            value: 'replacement_cost'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e028d50d56cf46838d24a53dea80113c'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e10c64ecdaab45f6a04b6e94b4d65d1f'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e171e596963d4c55aebc92ce971e78d3'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e4f5f00295e246e0b3fbd5b0a1a7ee32'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'incident_id'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'e6d28b32550f464dbf12a4058bfc4f9a'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso.librarian'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e706cb326d8f48a391d8d6dcd9529529'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'missing_pages'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea1d03dc6eb64bb9bc05fa0efa7a1502'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f21d86c48c9a456d9112529188de8bff'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'recommended_fee'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f609535b35b24c9e87ce7487ab5fdf0b'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fadf56ff9ce047018445f3cec546d61b'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'paid'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fb4b6def93ee46189db94ea20d1ee7ac'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            value: 'rejected'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fbd08e63b7a146a0a1f03b3dbedc180f'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_isbn'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ff3fdff2f61945b1be696eb9f0c7e2be'
                        deleted: true
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'high'
                        }
                    },
                ]
            }
        }
    }
}
