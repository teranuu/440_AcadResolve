import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    academic_resolve_api: {
                        table: 'sys_ws_definition'
                        id: '4079580a8860450a8998521abc4e41d5'
                    }
                    acadreso_api: {
                        table: 'sys_ws_definition'
                        id: '84390c78351a469caef50dfe08b5adbf'
                        deleted: true
                    }
                    acadresolve_api: {
                        table: 'sys_ws_definition'
                        id: '87165a9073d444c6843cc6a0270299de'
                        deleted: true
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
                    fee_schedule_1: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '236a3d5b658c4f02b4fb78c900d99185'
                    }
                    fee_schedule_2: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '7b0a7d13e80345209bfd0d0e0ae34156'
                    }
                    fee_schedule_3: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: 'b70da63cafdd45e19e4636dd1d27a589'
                    }
                    fee_schedule_4: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '4a3a936dbad549bbb02223bcc0b2d50d'
                    }
                    fee_schedule_5: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: 'a131259bf7ba4efdafff008abab882e2'
                    }
                    fee_schedule_6: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '1c7073e87e154259b7ebc02be64237fe'
                    }
                    fee_schedule_7: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '2ec63865d13c42689586b1ffb4b825ca'
                    }
                    fee_schedule_damaged_major: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '903036c06ba24b4196dd65e577bfd2a4'
                        deleted: true
                    }
                    fee_schedule_damaged_minor: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '99133ddfded14b5d83b0679ff530cd8d'
                        deleted: true
                    }
                    fee_schedule_damaged_moderate: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '6a5f5b6f618f499db75cac41442b070f'
                        deleted: true
                    }
                    fee_schedule_lost_total: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '49dfdfa1895947b0a6b647e5bec67cbb'
                        deleted: true
                    }
                    fee_schedule_torn_pages: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '21351c9b88f34e3b8881ecb4beb73361'
                        deleted: true
                    }
                    fee_schedule_water_damage: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '21c6850bfd294185ac0b810c8ba7c55d'
                        deleted: true
                    }
                    fee_schedule_writing: {
                        table: 'x_1997678_acadreso_fee_schedule'
                        id: '08795eca2df44f1c8e152f72c1e1b03d'
                        deleted: true
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
                        deleted: true
                    }
                    update_incident_status_route: {
                        table: 'sys_ws_operation'
                        id: '952ce9cb74524e5c8d27446a2e48328f'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '014caca0d5c64f729886291d7b068fa7'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '01e819d84477490b932827049817b752'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'incident_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '0402002a502345e48e5263d96a0d74b3'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '040bfae041884c8593d95b53b61aee94'
                        deleted: false
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
                        table: 'sys_choice'
                        id: '0fe3f8e2ddf040d7a6cf98572e7c1aca'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1023db234fef4dc38deab1adad2e1382'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1135fd836bb04d658483c7baeebf4b9a'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '16de18de69c441689cbaba918e03917e'
                        deleted: false
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'student_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '185623898f734060bb320f47e38d6756'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            value: 'damaged'
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d6918f54bda4d34a82a750e0e834d15'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e248e6e25764b0aa0fe4afda19afa9b'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            value: 'fixed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e54f82fbba74cfc933ecc8c1dd96c17'
                        deleted: false
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
                        table: 'sys_choice'
                        id: '20bb4d6d5e514d16ad965ab3e3f8d510'
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2313d3a83a56420f99030b5358581b19'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            value: 'cover_damage'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '243063778d134b1db319f3c4d2998bb8'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_percentage'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '27737b4765f84f4b966e3f3e8d134521'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'damaged'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '27db37f263b64b1bacf27415a7e37935'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2ad403225991419abca11a16da699675'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2bc206499e9b477394c0cdf4dadaf4d7'
                        deleted: false
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2cd29ac46cd04931b783217a2466f1e1'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2cf15b21653342988b24452d50bfb6c6'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '324eb1f83b014fe296a8ba62dac68371'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'incident_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '326067cfdc85416793797d7cef4056a0'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '32712ff8fa6d410fb316239b15c75cdd'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'minor'
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '35f83c96309d4f8db228d31d86b1db6e'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                            value: 'moderate'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36ac72c9c7cf4ee4b77db603328061c5'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'pending_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39c3ec586a5c40dcbd3dac9e3eac6eec'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'open'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3c456c43f66b4363b51576f888a5d6dd'
                        deleted: false
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
                        deleted: false
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
                        table: 'sys_dictionary'
                        id: '40b9b0503d194736b28b633323847ec9'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_gateway_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42b7b9539b1448b998bb2cb82634b3ea'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '457cf9e6098b4ceaaff5e5d1b05768a0'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b26a351ecf34877a23af1003b424f5a'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4baa054330874376ae819e2101924995'
                        deleted: false
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '522c109aea6a421c87f36c7bcb5f5607'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'cover_damage'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5505100b716444699427e8c6fac25124'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_isbn'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '553831b0d1894b8ab3a26c55e2b6ffc9'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5812187fe33b45a0935f7ccab377426f'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'major'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '5887db9bb3b04b6ba656873d5e0fbce7'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_status'
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '639cd284b3cb455194773a92f253c07a'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'resolved_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '64687e8e623a4430a18b33defa4bbcbb'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '652c865362284009bb24c54b847de956'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6558683520344826859c278feb42b80d'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                            value: 'major'
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'ai_assessment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6a59c4454f3949308808cab55f4e9a9a'
                        deleted: false
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
                        table: 'sys_choice'
                        id: '6f0c9a270a414cc08717398e639750b2'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_status'
                            value: 'failed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '745f3d87b2c24fc0bda3206040cfc3c3'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'recommended_fee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '74ce97598c6840bb877dfc24d54120e1'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'writing'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '782bff8a850e49018a1bf165dcd49614'
                        key: {
                            logical_table_name: 'x_1997678_acadreso_fee_schedule'
                            col_name_string: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7968706eef6d4173adb2ef135d379283'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7e38eb6a22d840db9f9403b3539702bb'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7f074e8088604e84bad1c0c4594fed97'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'ai_assessment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7f660d2f9907408094c6fb6036f38bf4'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'student_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80b5d7e5959342a9900f875a193766f8'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8350ed701ef54e0c95d48408054f61fd'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '84cafa57a04341cb9271a525f58632e4'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'description'
                            language: 'en'
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
                        deleted: false
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approver_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '8e09a67a70e044a588da8fe8b32a1297'
                        deleted: false
                        key: {
                            category: 'x_1997678_acadreso_book_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9073af8ff2b4492e814442a7665c1bf0'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            value: 'lost'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '90838c8af3df4e46b4db88b853164441'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'replaced'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91e2e8d5c68d4d1489f1f1a4d9079698'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '956ce486d57641209e06325144ad7c48'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '96049743022e4bd285a2445daef57948'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_status'
                            value: 'processing'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '97347bfc4cda4513a2e1b3c29606fba8'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            value: 'water_damage'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '97416ef5816847e99a1d03d9d8bb48e1'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'water_damage'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97c56a5df596495ba1c2740fbbd6521c'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'incident_date'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '999c0604063548ebaa3117745a2bbad3'
                        deleted: false
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            value: 'percentage'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c1c4d66891b4ae99c0399de186377b1'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9e06dd698d674293971d1a88b89a0aae'
                        deleted: false
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'calculated_fee'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a6c0dc6cb8bc4130af5d224f0d8eb2e9'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ac53dcae338f46938b0051aa6e710702'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae3dc67e982c4e11ac1786877f2b001d'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae967b0e66d64cc2955ebb6825cfdb9b'
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b20d4a9d1adc4d20baf7ac9d54390f43'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'disputed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2c97467b09e40eab6290512693089a3'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'calculated_fee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b49958511d444f80aa1216eecc473ae1'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'moderate'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b4e9907ee3254becacdcab78fd40d694'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'book_value'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'b78365b8c60c4578825293180e9c8859'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b973c0396f684ea19ed2c3ddcac30190'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_status'
                            value: 'pending'
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1b2599422e54604bd560482f9ff8c89'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4dc0a162089471e994bec31aec13a16'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'recommended_damage_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c520412793c44d4f80eddc0cc9efbfe8'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            value: 'torn_pages'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c98f053915fc41fe920dd1a09456ff3e'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd0e56a4782da40a0a694f24e41beec25'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                            value: 'total_loss'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd150058f245748f68ff216ef4b440622'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3ccdda62f7447eabe793fd8e49e35ce'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'resolved_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4c18bcb63ca44a399d0289918edfe7c'
                        deleted: false
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd06824c068a400e83200f22ecb43937'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dd331085cef740fd92402309e70f5a7f'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            value: 'replacement_cost'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e028d50d56cf46838d24a53dea80113c'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e10c64ecdaab45f6a04b6e94b4d65d1f'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e171e596963d4c55aebc92ce971e78d3'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'fee_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e4f5f00295e246e0b3fbd5b0a1a7ee32'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'incident_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e68414a493834a6c86fbb03424aa2229'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            value: 'writing'
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
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'damage_type'
                            value: 'missing_pages'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea1d03dc6eb64bb9bc05fa0efa7a1502'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ea46225cbe354199b37c52bfe8d7444f'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                            value: 'minor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f1bd7e3d85fb4abe8e33c720033dc5bc'
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'comments'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1f48f23cd9a460ea41a6066710bde3f'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_type'
                            value: 'missing_pages'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f21d86c48c9a456d9112529188de8bff'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'recommended_fee'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f4ec8b64d0434c8097cc14182a0ba9b8'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
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
                        id: 'f63658eb68344c7c8b4d0901577ed09d'
                        key: {
                            name: 'x_1997678_acadreso_fee_schedule'
                            element: 'damage_level'
                            value: 'total_loss'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6b82553c2444ebcb063ca304b100553'
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'payment_gateway_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fadf56ff9ce047018445f3cec546d61b'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_book_incident'
                            element: 'state'
                            value: 'paid'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fb4b6def93ee46189db94ea20d1ee7ac'
                        deleted: false
                        key: {
                            name: 'x_1997678_acadreso_approval'
                            element: 'approval_status'
                            value: 'rejected'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fbd08e63b7a146a0a1f03b3dbedc180f'
                        deleted: false
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
