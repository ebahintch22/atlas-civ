{
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "The root schema",
    "description": "The root schema comprises the entire JSON document.",
    "default": {},
    "examples": [
        {
            "index": 1,
            "name": "covid-19-june16",
            "group": "SPECIAL",
            "valid": true,
            "table_num": "Tableau-98",
            "layerList": [
                "district_sante",
                "region_sante"
            ],
            "label": "01- Incidence nationale de la COVID-19 (Carto actualisée au 16/06/2020)",
            "unit": "nombre de cas",
            "article": "de ",
            "path": "data/statistics/tab_98_covid_june16.csv",
            "source": "DIIS/INS",
            "data_parser": "DEFAULT_PARSER",
            "renderer": {
                "default": {
                    "source": "manual",
                    "threshold": [
                        1,
                        5,
                        10,
                        100,
                        1000
                    ],
                    "colormap": [
                        "#ffffff",
                        "#fcf285",
                        "#F6B20D",
                        "#CC5526",
                        "#C22C1C",
                        "#660207"
                    ],
                    "labelmap": [
                        "Aucun cas",
                        "",
                        "Incidence faible",
                        "Incidence Moyenne",
                        "Incidence élevée",
                        "Epicentres"
                    ],
                    "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                    "select_style": "blueish"
                }
            },
            "layout": "COVID",
            "color_palette": "YlOrRd",
            "charts": {
                "color": "RED"
            },
            "field_selected": "default_field_selection",
            "data_fields": [
                {
                    "fld_name": "FLD1",
                    "short_name": " Nombre de cas confirmés de COVID-19",
                    "long_name": "COVID-19: Répartition des cas confirmés (au 16 juin 2020)",
                    "data_type": "INT",
                    "unit": "cas confirmés de COVID-19",
                    "renderer": {
                        "default": {
                            "source": "manual",
                            "threshold": [
                                1,
                                5,
                                10,
                                100,
                                1000
                            ],
                            "colormap": [
                                "#ffffff",
                                "#fcf285",
                                "#F6B20D",
                                "#CC5526",
                                "#C22C1C",
                                "#660207"
                            ],
                            "labelmap": [
                                "Aucun cas",
                                "",
                                "Incidence faible",
                                "Incidence Moyenne",
                                "Incidence élevée",
                                "Epicentres"
                            ],
                            "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                            "select_style": "blueish"
                        }
                    }
                },
                {
                    "fld_name": "FLD2",
                    "short_name": "Nb de décès dus à la COVID-19",
                    "long_name": "Nombre de décès dus à la COVID-19 (au 16 juin 2020)",
                    "data_type": "INT",
                    "unit": "décès dus à la COVID-19",
                    "renderer": {
                        "default": {
                            "source": "manual",
                            "threshold": [
                                1,
                                5,
                                10,
                                20
                            ],
                            "colormap": [
                                "#ffffff",
                                "#fcf285",
                                "#F6B20D",
                                "#CC5526",
                                "#660207"
                            ],
                            "labelmap": [
                                "Aucun décès",
                                "1 à 4 décès",
                                "5 à 9 décès",
                                "10 à 19 décès",
                                "plus de 20 décès"
                            ],
                            "legendtitle": "Incidence  de la maladie à Covid-19 (nb. de décès)",
                            "select_style": "blueish"
                        }
                    }
                }
            ]
        }
    ],
    "required": [
        "index",
        "name",
        "group",
        "valid",
        "table_num",
        "layerList",
        "label",
        "unit",
        "article",
        "path",
        "source",
        "data_parser",
        "renderer",
        "layout",
        "color_palette",
        "charts",
        "field_selected",
        "data_fields"
    ],
    "properties": {
        "index": {
            "$id": "#/properties/index",
            "type": "integer",
            "title": "The index schema",
            "description": "An explanation about the purpose of this instance.",
            "default": 0,
            "examples": [
                1
            ]
        },
        "name": {
            "$id": "#/properties/name",
            "type": "string",
            "title": "The name schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "covid-19-june16"
            ]
        },
        "group": {
            "$id": "#/properties/group",
            "type": "string",
            "title": "The group schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "SPECIAL"
            ]
        },
        "valid": {
            "$id": "#/properties/valid",
            "type": "boolean",
            "title": "The valid schema",
            "description": "An explanation about the purpose of this instance.",
            "default": false,
            "examples": [
                true
            ]
        },
        "table_num": {
            "$id": "#/properties/table_num",
            "type": "string",
            "title": "The table_num schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "Tableau-98"
            ]
        },
        "layerList": {
            "$id": "#/properties/layerList",
            "type": "array",
            "title": "The layerList schema",
            "description": "An explanation about the purpose of this instance.",
            "default": [],
            "examples": [
                [
                    "district_sante",
                    "region_sante"
                ]
            ],
            "additionalItems": true,
            "items": {
                "$id": "#/properties/layerList/items",
                "anyOf": [
                    {
                        "$id": "#/properties/layerList/items/anyOf/0",
                        "type": "string",
                        "title": "The first anyOf schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": "",
                        "examples": [
                            "district_sante",
                            "region_sante"
                        ]
                    }
                ]
            }
        },
        "label": {
            "$id": "#/properties/label",
            "type": "string",
            "title": "The label schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "01- Incidence nationale de la COVID-19 (Carto actualisée au 16/06/2020)"
            ]
        },
        "unit": {
            "$id": "#/properties/unit",
            "type": "string",
            "title": "The unit schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "nombre de cas"
            ]
        },
        "article": {
            "$id": "#/properties/article",
            "type": "string",
            "title": "The article schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "de "
            ]
        },
        "path": {
            "$id": "#/properties/path",
            "type": "string",
            "title": "The path schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "data/statistics/tab_98_covid_june16.csv"
            ]
        },
        "source": {
            "$id": "#/properties/source",
            "type": "string",
            "title": "The source schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "DIIS/INS"
            ]
        },
        "data_parser": {
            "$id": "#/properties/data_parser",
            "type": "string",
            "title": "The data_parser schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "DEFAULT_PARSER"
            ]
        },
        "renderer": {
            "$id": "#/properties/renderer",
            "type": "object",
            "title": "The renderer schema",
            "description": "An explanation about the purpose of this instance.",
            "default": {},
            "examples": [
                {
                    "default": {
                        "source": "manual",
                        "threshold": [
                            1,
                            5,
                            10,
                            100,
                            1000
                        ],
                        "colormap": [
                            "#ffffff",
                            "#fcf285",
                            "#F6B20D",
                            "#CC5526",
                            "#C22C1C",
                            "#660207"
                        ],
                        "labelmap": [
                            "Aucun cas",
                            "",
                            "Incidence faible",
                            "Incidence Moyenne",
                            "Incidence élevée",
                            "Epicentres"
                        ],
                        "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                        "select_style": "blueish"
                    }
                }
            ],
            "required": [
                "default"
            ],
            "properties": {
                "default": {
                    "$id": "#/properties/renderer/properties/default",
                    "type": "object",
                    "title": "The default schema",
                    "description": "An explanation about the purpose of this instance.",
                    "default": {},
                    "examples": [
                        {
                            "source": "manual",
                            "threshold": [
                                1,
                                5,
                                10,
                                100,
                                1000
                            ],
                            "colormap": [
                                "#ffffff",
                                "#fcf285",
                                "#F6B20D",
                                "#CC5526",
                                "#C22C1C",
                                "#660207"
                            ],
                            "labelmap": [
                                "Aucun cas",
                                "",
                                "Incidence faible",
                                "Incidence Moyenne",
                                "Incidence élevée",
                                "Epicentres"
                            ],
                            "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                            "select_style": "blueish"
                        }
                    ],
                    "required": [
                        "source",
                        "threshold",
                        "colormap",
                        "labelmap",
                        "legendtitle",
                        "select_style"
                    ],
                    "properties": {
                        "source": {
                            "$id": "#/properties/renderer/properties/default/properties/source",
                            "type": "string",
                            "title": "The source schema",
                            "description": "An explanation about the purpose of this instance.",
                            "default": "",
                            "examples": [
                                "manual"
                            ]
                        },
                        "threshold": {
                            "$id": "#/properties/renderer/properties/default/properties/threshold",
                            "type": "array",
                            "title": "The threshold schema",
                            "description": "An explanation about the purpose of this instance.",
                            "default": [],
                            "examples": [
                                [
                                    1,
                                    5
                                ]
                            ],
                            "additionalItems": true,
                            "items": {
                                "$id": "#/properties/renderer/properties/default/properties/threshold/items",
                                "anyOf": [
                                    {
                                        "$id": "#/properties/renderer/properties/default/properties/threshold/items/anyOf/0",
                                        "type": "integer",
                                        "title": "The first anyOf schema",
                                        "description": "An explanation about the purpose of this instance.",
                                        "default": 0,
                                        "examples": [
                                            1,
                                            5
                                        ]
                                    }
                                ]
                            }
                        },
                        "colormap": {
                            "$id": "#/properties/renderer/properties/default/properties/colormap",
                            "type": "array",
                            "title": "The colormap schema",
                            "description": "An explanation about the purpose of this instance.",
                            "default": [],
                            "examples": [
                                [
                                    "#ffffff",
                                    "#fcf285"
                                ]
                            ],
                            "additionalItems": true,
                            "items": {
                                "$id": "#/properties/renderer/properties/default/properties/colormap/items",
                                "anyOf": [
                                    {
                                        "$id": "#/properties/renderer/properties/default/properties/colormap/items/anyOf/0",
                                        "type": "string",
                                        "title": "The first anyOf schema",
                                        "description": "An explanation about the purpose of this instance.",
                                        "default": "",
                                        "examples": [
                                            "#ffffff",
                                            "#fcf285"
                                        ]
                                    }
                                ]
                            }
                        },
                        "labelmap": {
                            "$id": "#/properties/renderer/properties/default/properties/labelmap",
                            "type": "array",
                            "title": "The labelmap schema",
                            "description": "An explanation about the purpose of this instance.",
                            "default": [],
                            "examples": [
                                [
                                    "Aucun cas",
                                    ""
                                ]
                            ],
                            "additionalItems": true,
                            "items": {
                                "$id": "#/properties/renderer/properties/default/properties/labelmap/items",
                                "anyOf": [
                                    {
                                        "$id": "#/properties/renderer/properties/default/properties/labelmap/items/anyOf/0",
                                        "type": "string",
                                        "title": "The first anyOf schema",
                                        "description": "An explanation about the purpose of this instance.",
                                        "default": "",
                                        "examples": [
                                            "Aucun cas",
                                            ""
                                        ]
                                    }
                                ]
                            }
                        },
                        "legendtitle": {
                            "$id": "#/properties/renderer/properties/default/properties/legendtitle",
                            "type": "string",
                            "title": "The legendtitle schema",
                            "description": "An explanation about the purpose of this instance.",
                            "default": "",
                            "examples": [
                                "Incidence  de la maladie à Covid-19 (nb. cas confirmés)"
                            ]
                        },
                        "select_style": {
                            "$id": "#/properties/renderer/properties/default/properties/select_style",
                            "type": "string",
                            "title": "The select_style schema",
                            "description": "An explanation about the purpose of this instance.",
                            "default": "",
                            "examples": [
                                "blueish"
                            ]
                        }
                    },
                    "additionalProperties": true
                }
            },
            "additionalProperties": true
        },
        "layout": {
            "$id": "#/properties/layout",
            "type": "string",
            "title": "The layout schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "COVID"
            ]
        },
        "color_palette": {
            "$id": "#/properties/color_palette",
            "type": "string",
            "title": "The color_palette schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "YlOrRd"
            ]
        },
        "charts": {
            "$id": "#/properties/charts",
            "type": "object",
            "title": "The charts schema",
            "description": "An explanation about the purpose of this instance.",
            "default": {},
            "examples": [
                {
                    "color": "RED"
                }
            ],
            "required": [
                "color"
            ],
            "properties": {
                "color": {
                    "$id": "#/properties/charts/properties/color",
                    "type": "string",
                    "title": "The color schema",
                    "description": "An explanation about the purpose of this instance.",
                    "default": "",
                    "examples": [
                        "RED"
                    ]
                }
            },
            "additionalProperties": true
        },
        "field_selected": {
            "$id": "#/properties/field_selected",
            "type": "string",
            "title": "The field_selected schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "default_field_selection"
            ]
        },
        "data_fields": {
            "$id": "#/properties/data_fields",
            "type": "array",
            "title": "The data_fields schema",
            "description": "An explanation about the purpose of this instance.",
            "default": [],
            "examples": [
                [
                    {
                        "fld_name": "FLD1",
                        "short_name": " Nombre de cas confirmés de COVID-19",
                        "long_name": "COVID-19: Répartition des cas confirmés (au 16 juin 2020)",
                        "data_type": "INT",
                        "unit": "cas confirmés de COVID-19",
                        "renderer": {
                            "default": {
                                "source": "manual",
                                "threshold": [
                                    1,
                                    5,
                                    10,
                                    100,
                                    1000
                                ],
                                "colormap": [
                                    "#ffffff",
                                    "#fcf285",
                                    "#F6B20D",
                                    "#CC5526",
                                    "#C22C1C",
                                    "#660207"
                                ],
                                "labelmap": [
                                    "Aucun cas",
                                    "",
                                    "Incidence faible",
                                    "Incidence Moyenne",
                                    "Incidence élevée",
                                    "Epicentres"
                                ],
                                "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                                "select_style": "blueish"
                            }
                        }
                    },
                    {
                        "fld_name": "FLD2",
                        "short_name": "Nb de décès dus à la COVID-19",
                        "long_name": "Nombre de décès dus à la COVID-19 (au 16 juin 2020)",
                        "data_type": "INT",
                        "unit": "décès dus à la COVID-19",
                        "renderer": {
                            "default": {
                                "source": "manual",
                                "threshold": [
                                    1,
                                    5,
                                    10,
                                    20
                                ],
                                "colormap": [
                                    "#ffffff",
                                    "#fcf285",
                                    "#F6B20D",
                                    "#CC5526",
                                    "#660207"
                                ],
                                "labelmap": [
                                    "Aucun décès",
                                    "1 à 4 décès",
                                    "5 à 9 décès",
                                    "10 à 19 décès",
                                    "plus de 20 décès"
                                ],
                                "legendtitle": "Incidence  de la maladie à Covid-19 (nb. de décès)",
                                "select_style": "blueish"
                            }
                        }
                    }
                ]
            ],
            "additionalItems": true,
            "items": {
                "$id": "#/properties/data_fields/items",
                "anyOf": [
                    {
                        "$id": "#/properties/data_fields/items/anyOf/0",
                        "type": "object",
                        "title": "The first anyOf schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": {},
                        "examples": [
                            {
                                "fld_name": "FLD1",
                                "short_name": " Nombre de cas confirmés de COVID-19",
                                "long_name": "COVID-19: Répartition des cas confirmés (au 16 juin 2020)",
                                "data_type": "INT",
                                "unit": "cas confirmés de COVID-19",
                                "renderer": {
                                    "default": {
                                        "source": "manual",
                                        "threshold": [
                                            1,
                                            5,
                                            10,
                                            100,
                                            1000
                                        ],
                                        "colormap": [
                                            "#ffffff",
                                            "#fcf285",
                                            "#F6B20D",
                                            "#CC5526",
                                            "#C22C1C",
                                            "#660207"
                                        ],
                                        "labelmap": [
                                            "Aucun cas",
                                            "",
                                            "Incidence faible",
                                            "Incidence Moyenne",
                                            "Incidence élevée",
                                            "Epicentres"
                                        ],
                                        "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                                        "select_style": "blueish"
                                    }
                                }
                            }
                        ],
                        "required": [
                            "fld_name",
                            "short_name",
                            "long_name",
                            "data_type",
                            "unit",
                            "renderer"
                        ],
                        "properties": {
                            "fld_name": {
                                "$id": "#/properties/data_fields/items/anyOf/0/properties/fld_name",
                                "type": "string",
                                "title": "The fld_name schema",
                                "description": "An explanation about the purpose of this instance.",
                                "default": "",
                                "examples": [
                                    "FLD1"
                                ]
                            },
                            "short_name": {
                                "$id": "#/properties/data_fields/items/anyOf/0/properties/short_name",
                                "type": "string",
                                "title": "The short_name schema",
                                "description": "An explanation about the purpose of this instance.",
                                "default": "",
                                "examples": [
                                    " Nombre de cas confirmés de COVID-19"
                                ]
                            },
                            "long_name": {
                                "$id": "#/properties/data_fields/items/anyOf/0/properties/long_name",
                                "type": "string",
                                "title": "The long_name schema",
                                "description": "An explanation about the purpose of this instance.",
                                "default": "",
                                "examples": [
                                    "COVID-19: Répartition des cas confirmés (au 16 juin 2020)"
                                ]
                            },
                            "data_type": {
                                "$id": "#/properties/data_fields/items/anyOf/0/properties/data_type",
                                "type": "string",
                                "title": "The data_type schema",
                                "description": "An explanation about the purpose of this instance.",
                                "default": "",
                                "examples": [
                                    "INT"
                                ]
                            },
                            "unit": {
                                "$id": "#/properties/data_fields/items/anyOf/0/properties/unit",
                                "type": "string",
                                "title": "The unit schema",
                                "description": "An explanation about the purpose of this instance.",
                                "default": "",
                                "examples": [
                                    "cas confirmés de COVID-19"
                                ]
                            },
                            "renderer": {
                                "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer",
                                "type": "object",
                                "title": "The renderer schema",
                                "description": "An explanation about the purpose of this instance.",
                                "default": {},
                                "examples": [
                                    {
                                        "default": {
                                            "source": "manual",
                                            "threshold": [
                                                1,
                                                5,
                                                10,
                                                100,
                                                1000
                                            ],
                                            "colormap": [
                                                "#ffffff",
                                                "#fcf285",
                                                "#F6B20D",
                                                "#CC5526",
                                                "#C22C1C",
                                                "#660207"
                                            ],
                                            "labelmap": [
                                                "Aucun cas",
                                                "",
                                                "Incidence faible",
                                                "Incidence Moyenne",
                                                "Incidence élevée",
                                                "Epicentres"
                                            ],
                                            "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                                            "select_style": "blueish"
                                        }
                                    }
                                ],
                                "required": [
                                    "default"
                                ],
                                "properties": {
                                    "default": {
                                        "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default",
                                        "type": "object",
                                        "title": "The default schema",
                                        "description": "An explanation about the purpose of this instance.",
                                        "default": {},
                                        "examples": [
                                            {
                                                "source": "manual",
                                                "threshold": [
                                                    1,
                                                    5,
                                                    10,
                                                    100,
                                                    1000
                                                ],
                                                "colormap": [
                                                    "#ffffff",
                                                    "#fcf285",
                                                    "#F6B20D",
                                                    "#CC5526",
                                                    "#C22C1C",
                                                    "#660207"
                                                ],
                                                "labelmap": [
                                                    "Aucun cas",
                                                    "",
                                                    "Incidence faible",
                                                    "Incidence Moyenne",
                                                    "Incidence élevée",
                                                    "Epicentres"
                                                ],
                                                "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                                                "select_style": "blueish"
                                            }
                                        ],
                                        "required": [
                                            "source",
                                            "threshold",
                                            "colormap",
                                            "labelmap",
                                            "legendtitle",
                                            "select_style"
                                        ],
                                        "properties": {
                                            "source": {
                                                "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/source",
                                                "type": "string",
                                                "title": "The source schema",
                                                "description": "An explanation about the purpose of this instance.",
                                                "default": "",
                                                "examples": [
                                                    "manual"
                                                ]
                                            },
                                            "threshold": {
                                                "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/threshold",
                                                "type": "array",
                                                "title": "The threshold schema",
                                                "description": "An explanation about the purpose of this instance.",
                                                "default": [],
                                                "examples": [
                                                    [
                                                        1,
                                                        5
                                                    ]
                                                ],
                                                "additionalItems": true,
                                                "items": {
                                                    "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/threshold/items",
                                                    "anyOf": [
                                                        {
                                                            "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/threshold/items/anyOf/0",
                                                            "type": "integer",
                                                            "title": "The first anyOf schema",
                                                            "description": "An explanation about the purpose of this instance.",
                                                            "default": 0,
                                                            "examples": [
                                                                1,
                                                                5
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            "colormap": {
                                                "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/colormap",
                                                "type": "array",
                                                "title": "The colormap schema",
                                                "description": "An explanation about the purpose of this instance.",
                                                "default": [],
                                                "examples": [
                                                    [
                                                        "#ffffff",
                                                        "#fcf285"
                                                    ]
                                                ],
                                                "additionalItems": true,
                                                "items": {
                                                    "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/colormap/items",
                                                    "anyOf": [
                                                        {
                                                            "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/colormap/items/anyOf/0",
                                                            "type": "string",
                                                            "title": "The first anyOf schema",
                                                            "description": "An explanation about the purpose of this instance.",
                                                            "default": "",
                                                            "examples": [
                                                                "#ffffff",
                                                                "#fcf285"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            "labelmap": {
                                                "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/labelmap",
                                                "type": "array",
                                                "title": "The labelmap schema",
                                                "description": "An explanation about the purpose of this instance.",
                                                "default": [],
                                                "examples": [
                                                    [
                                                        "Aucun cas",
                                                        ""
                                                    ]
                                                ],
                                                "additionalItems": true,
                                                "items": {
                                                    "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/labelmap/items",
                                                    "anyOf": [
                                                        {
                                                            "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/labelmap/items/anyOf/0",
                                                            "type": "string",
                                                            "title": "The first anyOf schema",
                                                            "description": "An explanation about the purpose of this instance.",
                                                            "default": "",
                                                            "examples": [
                                                                "Aucun cas",
                                                                ""
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            "legendtitle": {
                                                "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/legendtitle",
                                                "type": "string",
                                                "title": "Titre de la légende",
                                                "description": "Libellé apparaissant au-dessus de la légende",
                                                "default": "",
                                                "examples": [
                                                    "Incidence  de la maladie à Covid-19 (nb. cas confirmés)"
                                                ]
                                            },
                                            "select_style": {
                                                "$id": "#/properties/data_fields/items/anyOf/0/properties/renderer/properties/default/properties/select_style",
                                                "type": "string",
                                                "title": "The select_style schema",
                                                "description": "An explanation about the purpose of this instance.",
                                                "default": "",
                                                "examples": [
                                                    "blueish"
                                                ]
                                            }
                                        },
                                        "additionalProperties": true
                                    }
                                },
                                "additionalProperties": true
                            }
                        },
                        "additionalProperties": true
                    }
                ]
            }
        }
    },
    "additionalProperties": true
}


example : {
                    "properties": [
                    {
                        "index": 1,
                        "name": "covid-19-june16",
                        "group": "SPECIAL",
                        "valid": true,
                        "table_num": "Tableau-98",
                        "layerList": [
                            "district_sante",
                            "region_sante"
                        ],
                        "label": "01- Incidence nationale de la COVID-19 (Carto actualisée au 16/06/2020)",
                        "unit": "nombre de cas",
                        "article": "de ",
                        "path": "data/statistics/tab_98_covid_june16.csv",
                        "source": "DIIS/INS",
                        "data_parser": "DEFAULT_PARSER",
                        "renderer": {
                            "default": {
                                "source": "manual",
                                "threshold": [
                                    1,
                                    5,
                                    10,
                                    100,
                                    1000
                                ],
                                "colormap": [
                                    "#ffffff",
                                    "#fcf285",
                                    "#F6B20D",
                                    "#CC5526",
                                    "#C22C1C",
                                    "#660207"
                                ],
                                "labelmap": [
                                    "Aucun cas",
                                    "",
                                    "Incidence faible",
                                    "Incidence Moyenne",
                                    "Incidence élevée",
                                    "Epicentres"
                                ],
                                "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                                "select_style": "blueish"
                            }
                        },
                        "layout": "COVID",
                        "color_palette": "YlOrRd",
                        "charts": {
                            "color": "RED"
                        },
                        "field_selected": "default_field_selection",
                        "data_fields": [
                            {
                                "fld_name": "FLD1",
                                "short_name": " Nombre de cas confirmés de COVID-19",
                                "long_name": "COVID-19: Répartition des cas confirmés (au 16 juin 2020)",
                                "data_type": "INT",
                                "unit": "cas confirmés de COVID-19",
                                "renderer": {
                                    "default": {
                                        "source": "manual",
                                        "threshold": [
                                            1,
                                            5,
                                            10,
                                            100,
                                            1000
                                        ],
                                        "colormap": [
                                            "#ffffff",
                                            "#fcf285",
                                            "#F6B20D",
                                            "#CC5526",
                                            "#C22C1C",
                                            "#660207"
                                        ],
                                        "labelmap": [
                                            "Aucun cas",
                                            "",
                                            "Incidence faible",
                                            "Incidence Moyenne",
                                            "Incidence élevée",
                                            "Epicentres"
                                        ],
                                        "legendtitle": "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
                                        "select_style": "blueish"
                                    }
                                }
                            },
                            {
                                "fld_name": "FLD2",
                                "short_name": "Nb de décès dus à la COVID-19",
                                "long_name": "Nombre de décès dus à la COVID-19 (au 16 juin 2020)",
                                "data_type": "INT",
                                "unit": "décès dus à la COVID-19",
                                "renderer": {
                                    "default": {
                                        "source": "manual",
                                        "threshold": [
                                            1,
                                            5,
                                            10,
                                            20
                                        ],
                                        "colormap": [
                                            "#ffffff",
                                            "#fcf285",
                                            "#F6B20D",
                                            "#CC5526",
                                            "#660207"
                                        ],
                                        "labelmap": [
                                            "Aucun décès",
                                            "1 à 4 décès",
                                            "5 à 9 décès",
                                            "10 à 19 décès",
                                            "plus de 20 décès"
                                        ],
                                        "legendtitle": "Incidence  de la maladie à Covid-19 (nb. de décès)",
                                        "select_style": "blueish"
                                    }
                                }
                            }
                        ]
                    }
                ],
}




toto = function(){


    var data = {
        "source": "manual",
        "threshold": [
            500000,
            1000000,
            1500000,
            2000000,
            3000000
        ],
        "colormap": [
            "#ffffd4",
            "#fee391",
            "#fec44f",
            "#fe9929",
            "#d95f0e",
            "#993404"
        ],
        "linecolor": "#fff",
        "labelmap": [
            "moins de 500m",
            "500-400m",
            "1000-1500m",
            "1500-2000m",
            "2000-3000m",
            "3000m et plus"
        ],
        "legendtitle": "Population totale 2017 par Région",
        "select_style": "blueish"
    }

    var arr = data.labelmap
    var arr1 = arr.map(function(d, i ){
        return {
          value : (i==0)? 0 : data.threshold[ i-1 ],
          color : data.colormap[i],
          label : d       
        }
    })

    return ( {
        "legendtitle": "Population totale 2017 par Région",
        "select_style": "blueish",
        "linecolor": "#fff",
        items :  arr.map(function(d, i ){
            return {
              value : (i==0)? 0 : data.threshold[ i-1 ],
              color : data.colormap[i],
              label : d       
            }
        })
    })
}()

