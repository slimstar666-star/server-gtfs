/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    var $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $Array = $util.global.Array, $TypeError = $util.global.TypeError, $String = $util.global.String, $parseInt = $util.global.parseInt, $Number = $util.global.Number, $BigInt = $util.global.BigInt, $isFinite = $util.global.isFinite;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.transit_realtime = (function() {
    
        /**
         * Namespace transit_realtime.
         * @exports transit_realtime
         * @namespace
         */
        var transit_realtime = {};
    
        transit_realtime.FeedMessage = (function() {
    
            /**
             * Properties of a FeedMessage.
             * @typedef {Object} transit_realtime.FeedMessage.$Properties
             * @property {string} header FeedMessage header
             * @property {Array.<transit_realtime.FeedEntity.$Properties>|null} [entity] FeedMessage entity
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
    
            /**
             * Properties of a FeedMessage.
             * @memberof transit_realtime
             * @interface IFeedMessage
             * @augments transit_realtime.FeedMessage.$Properties
             * @deprecated Use transit_realtime.FeedMessage.$Properties instead.
             */
    
            /**
             * Shape of a FeedMessage.
             * @typedef {transit_realtime.FeedMessage.$Properties} transit_realtime.FeedMessage.$Shape
             */
    
            /**
             * Constructs a new FeedMessage.
             * @memberof transit_realtime
             * @classdesc Represents a FeedMessage.
             * @constructor
             * @param {transit_realtime.FeedMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            var FeedMessage = function (properties) {
                this.entity = [];
                if (properties)
                    for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };
    
            /**
             * FeedMessage header.
             * @member {string} header
             * @memberof transit_realtime.FeedMessage
             * @instance
             */
            FeedMessage.prototype.header = "";
    
            /**
             * FeedMessage entity.
             * @member {Array.<transit_realtime.FeedEntity.$Properties>} entity
             * @memberof transit_realtime.FeedMessage
             * @instance
             */
            FeedMessage.prototype.entity = $util.emptyArray;
    
            /**
             * Creates a new FeedMessage instance using the specified properties.
             * @function create
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {transit_realtime.FeedMessage.$Properties=} [properties] Properties to set
             * @returns {transit_realtime.FeedMessage} FeedMessage instance
             * @type {{
             *   (properties: transit_realtime.FeedMessage.$Shape): transit_realtime.FeedMessage & transit_realtime.FeedMessage.$Shape;
             *   (properties?: transit_realtime.FeedMessage.$Properties): transit_realtime.FeedMessage;
             * }}
             */
            FeedMessage.create = function(properties) {
                return new FeedMessage(properties);
            };
    
            /**
             * Encodes the specified FeedMessage message. Does not implicitly {@link transit_realtime.FeedMessage.verify|verify} messages.
             * @function encode
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {transit_realtime.FeedMessage.$Properties} message FeedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeedMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.header);
                if (message.entity != null && message.entity.length)
                    for (var i = 0; i < message.entity.length; ++i)
                        $root.transit_realtime.FeedEntity.encode(message.entity[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };
    
            /**
             * Encodes the specified FeedMessage message, length delimited. Does not implicitly {@link transit_realtime.FeedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {transit_realtime.FeedMessage.$Properties} message FeedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeedMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };
    
            /**
             * Decodes a FeedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {transit_realtime.FeedMessage & transit_realtime.FeedMessage.$Shape} FeedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeedMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.FeedMessage();
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            message.header = reader.string();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if (!(message.entity && message.entity.length))
                                message.entity = [];
                            message.entity.push($root.transit_realtime.FeedEntity.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                if (!$Object.hasOwnProperty.call(message, "header"))
                    throw $util.ProtocolError("missing required 'header'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a FeedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {transit_realtime.FeedMessage & transit_realtime.FeedMessage.$Shape} FeedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeedMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a FeedMessage message.
             * @function verify
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FeedMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isString(message.header))
                    return "header: string expected";
                if (message.entity != null && $Object.hasOwnProperty.call(message, "entity")) {
                    if (!$Array.isArray(message.entity))
                        return "entity: array expected";
                    for (var i = 0; i < message.entity.length; ++i) {
                        var error = $root.transit_realtime.FeedEntity.verify(message.entity[i], _depth + 1);
                        if (error)
                            return "entity." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a FeedMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {transit_realtime.FeedMessage} FeedMessage
             */
            FeedMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.transit_realtime.FeedMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".transit_realtime.FeedMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var message = new $root.transit_realtime.FeedMessage();
                if (object.header != null)
                    message.header = $String(object.header);
                if (object.entity) {
                    if (!$Array.isArray(object.entity))
                        throw $TypeError(".transit_realtime.FeedMessage.entity: array expected");
                    message.entity = $Array(object.entity.length);
                    for (var i = 0; i < object.entity.length; ++i) {
                        if (!$util.isObject(object.entity[i]))
                            throw $TypeError(".transit_realtime.FeedMessage.entity: object expected");
                        message.entity[i] = $root.transit_realtime.FeedEntity.fromObject(object.entity[i], _depth + 1);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FeedMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {transit_realtime.FeedMessage} message FeedMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FeedMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var object = {};
                if (options.arrays || options.defaults)
                    object.entity = [];
                if (options.defaults)
                    object.header = "";
                if (message.header != null && $Object.hasOwnProperty.call(message, "header"))
                    object.header = message.header;
                if (message.entity && message.entity.length) {
                    object.entity = $Array(message.entity.length);
                    for (var j = 0; j < message.entity.length; ++j)
                        object.entity[j] = $root.transit_realtime.FeedEntity.toObject(message.entity[j], options, _depth + 1);
                }
                return object;
            };
    
            /**
             * Converts this FeedMessage to JSON.
             * @function toJSON
             * @memberof transit_realtime.FeedMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FeedMessage.prototype.toJSON = function() {
                return FeedMessage.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the type url for FeedMessage
             * @function getTypeUrl
             * @memberof transit_realtime.FeedMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            FeedMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/transit_realtime.FeedMessage";
            };
    
            return FeedMessage;
        })();
    
        transit_realtime.FeedHeader = (function() {
    
            /**
             * Properties of a FeedHeader.
             * @typedef {Object} transit_realtime.FeedHeader.$Properties
             * @property {string} gtfsRealtimeVersion FeedHeader gtfsRealtimeVersion
             * @property {number|Long} timestamp FeedHeader timestamp
             * @property {transit_realtime.FeedHeader.Incrementality|null} [incrementality] FeedHeader incrementality
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
    
            /**
             * Properties of a FeedHeader.
             * @memberof transit_realtime
             * @interface IFeedHeader
             * @augments transit_realtime.FeedHeader.$Properties
             * @deprecated Use transit_realtime.FeedHeader.$Properties instead.
             */
    
            /**
             * Shape of a FeedHeader.
             * @typedef {transit_realtime.FeedHeader.$Properties} transit_realtime.FeedHeader.$Shape
             */
    
            /**
             * Constructs a new FeedHeader.
             * @memberof transit_realtime
             * @classdesc Represents a FeedHeader.
             * @constructor
             * @param {transit_realtime.FeedHeader.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            var FeedHeader = function (properties) {
                if (properties)
                    for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };
    
            /**
             * FeedHeader gtfsRealtimeVersion.
             * @member {string} gtfsRealtimeVersion
             * @memberof transit_realtime.FeedHeader
             * @instance
             */
            FeedHeader.prototype.gtfsRealtimeVersion = "";
    
            /**
             * FeedHeader timestamp.
             * @member {number|Long} timestamp
             * @memberof transit_realtime.FeedHeader
             * @instance
             */
            FeedHeader.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * FeedHeader incrementality.
             * @member {transit_realtime.FeedHeader.Incrementality} incrementality
             * @memberof transit_realtime.FeedHeader
             * @instance
             */
            FeedHeader.prototype.incrementality = 0;
    
            /**
             * Creates a new FeedHeader instance using the specified properties.
             * @function create
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {transit_realtime.FeedHeader.$Properties=} [properties] Properties to set
             * @returns {transit_realtime.FeedHeader} FeedHeader instance
             * @type {{
             *   (properties: transit_realtime.FeedHeader.$Shape): transit_realtime.FeedHeader & transit_realtime.FeedHeader.$Shape;
             *   (properties?: transit_realtime.FeedHeader.$Properties): transit_realtime.FeedHeader;
             * }}
             */
            FeedHeader.create = function(properties) {
                return new FeedHeader(properties);
            };
    
            /**
             * Encodes the specified FeedHeader message. Does not implicitly {@link transit_realtime.FeedHeader.verify|verify} messages.
             * @function encode
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {transit_realtime.FeedHeader.$Properties} message FeedHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeedHeader.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gtfsRealtimeVersion);
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.timestamp);
                if (message.incrementality != null && $Object.hasOwnProperty.call(message, "incrementality"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.incrementality);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };
    
            /**
             * Encodes the specified FeedHeader message, length delimited. Does not implicitly {@link transit_realtime.FeedHeader.verify|verify} messages.
             * @function encodeDelimited
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {transit_realtime.FeedHeader.$Properties} message FeedHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeedHeader.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };
    
            /**
             * Decodes a FeedHeader message from the specified reader or buffer.
             * @function decode
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {transit_realtime.FeedHeader & transit_realtime.FeedHeader.$Shape} FeedHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeedHeader.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.FeedHeader(), value;
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            message.gtfsRealtimeVersion = reader.string();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.timestamp = reader.uint64();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            value = reader.int32();
                            if ($root.transit_realtime.FeedHeader.Incrementality[value] !== $undefined)
                                message.incrementality = value;
                            else if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                if (!$Object.hasOwnProperty.call(message, "gtfsRealtimeVersion"))
                    throw $util.ProtocolError("missing required 'gtfsRealtimeVersion'", { instance: message });
                if (!$Object.hasOwnProperty.call(message, "timestamp"))
                    throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a FeedHeader message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {transit_realtime.FeedHeader & transit_realtime.FeedHeader.$Shape} FeedHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeedHeader.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a FeedHeader message.
             * @function verify
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FeedHeader.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isString(message.gtfsRealtimeVersion))
                    return "gtfsRealtimeVersion: string expected";
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
                if (message.incrementality != null && $Object.hasOwnProperty.call(message, "incrementality"))
                    switch (message.incrementality) {
                    default:
                        return "incrementality: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a FeedHeader message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {transit_realtime.FeedHeader} FeedHeader
             */
            FeedHeader.fromObject = function (object, _depth) {
                if (object instanceof $root.transit_realtime.FeedHeader)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".transit_realtime.FeedHeader: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var message = new $root.transit_realtime.FeedHeader();
                if (object.gtfsRealtimeVersion != null)
                    message.gtfsRealtimeVersion = $String(object.gtfsRealtimeVersion);
                if (object.timestamp != null)
                    if ($util.Long)
                        message.timestamp = $util.Long.fromValue(object.timestamp, true);
                    else if (typeof object.timestamp === "string")
                        message.timestamp = $parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
                switch (object.incrementality) {
                case "FULL_DATASET":
                case 0:
                    message.incrementality = 0;
                    break;
                case "DIFFERENTIAL":
                case 1:
                    message.incrementality = 1;
                    break;
                default:
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FeedHeader message. Also converts values to other types if specified.
             * @function toObject
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {transit_realtime.FeedHeader} message FeedHeader
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FeedHeader.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var object = {};
                if (options.defaults) {
                    object.gtfsRealtimeVersion = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.timestamp = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.timestamp = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.incrementality = options.enums === $String ? "FULL_DATASET" : 0;
                }
                if (message.gtfsRealtimeVersion != null && $Object.hasOwnProperty.call(message, "gtfsRealtimeVersion"))
                    object.gtfsRealtimeVersion = message.gtfsRealtimeVersion;
                if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.timestamp = typeof message.timestamp === "number" ? $BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, true).toBigInt();
                    else if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === $String ? $String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === $String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === $Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
                if (message.incrementality != null && $Object.hasOwnProperty.call(message, "incrementality"))
                    object.incrementality = options.enums === $String ? $root.transit_realtime.FeedHeader.Incrementality[message.incrementality] === $undefined ? message.incrementality : $root.transit_realtime.FeedHeader.Incrementality[message.incrementality] : message.incrementality;
                return object;
            };
    
            /**
             * Converts this FeedHeader to JSON.
             * @function toJSON
             * @memberof transit_realtime.FeedHeader
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FeedHeader.prototype.toJSON = function() {
                return FeedHeader.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the type url for FeedHeader
             * @function getTypeUrl
             * @memberof transit_realtime.FeedHeader
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            FeedHeader.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/transit_realtime.FeedHeader";
            };
    
            /**
             * Incrementality enum.
             * @name transit_realtime.FeedHeader.Incrementality
             * @enum {number}
             * @property {number} FULL_DATASET=0 FULL_DATASET value
             * @property {number} DIFFERENTIAL=1 DIFFERENTIAL value
             */
            FeedHeader.Incrementality = (function() {
                var valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "FULL_DATASET"] = 0;
                values[valuesById[1] = "DIFFERENTIAL"] = 1;
                return values;
            })();
    
            return FeedHeader;
        })();
    
        transit_realtime.FeedEntity = (function() {
    
            /**
             * Properties of a FeedEntity.
             * @typedef {Object} transit_realtime.FeedEntity.$Properties
             * @property {string} id FeedEntity id
             * @property {transit_realtime.VehiclePosition.$Properties|null} [vehicle] FeedEntity vehicle
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
    
            /**
             * Properties of a FeedEntity.
             * @memberof transit_realtime
             * @interface IFeedEntity
             * @augments transit_realtime.FeedEntity.$Properties
             * @deprecated Use transit_realtime.FeedEntity.$Properties instead.
             */
    
            /**
             * Shape of a FeedEntity.
             * @typedef {transit_realtime.FeedEntity.$Properties} transit_realtime.FeedEntity.$Shape
             */
    
            /**
             * Constructs a new FeedEntity.
             * @memberof transit_realtime
             * @classdesc Represents a FeedEntity.
             * @constructor
             * @param {transit_realtime.FeedEntity.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            var FeedEntity = function (properties) {
                if (properties)
                    for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };
    
            /**
             * FeedEntity id.
             * @member {string} id
             * @memberof transit_realtime.FeedEntity
             * @instance
             */
            FeedEntity.prototype.id = "";
    
            /**
             * FeedEntity vehicle.
             * @member {transit_realtime.VehiclePosition.$Properties|null|undefined} vehicle
             * @memberof transit_realtime.FeedEntity
             * @instance
             */
            FeedEntity.prototype.vehicle = null;
    
            /**
             * Creates a new FeedEntity instance using the specified properties.
             * @function create
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {transit_realtime.FeedEntity.$Properties=} [properties] Properties to set
             * @returns {transit_realtime.FeedEntity} FeedEntity instance
             * @type {{
             *   (properties: transit_realtime.FeedEntity.$Shape): transit_realtime.FeedEntity & transit_realtime.FeedEntity.$Shape;
             *   (properties?: transit_realtime.FeedEntity.$Properties): transit_realtime.FeedEntity;
             * }}
             */
            FeedEntity.create = function(properties) {
                return new FeedEntity(properties);
            };
    
            /**
             * Encodes the specified FeedEntity message. Does not implicitly {@link transit_realtime.FeedEntity.verify|verify} messages.
             * @function encode
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {transit_realtime.FeedEntity.$Properties} message FeedEntity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeedEntity.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.vehicle != null && $Object.hasOwnProperty.call(message, "vehicle"))
                    $root.transit_realtime.VehiclePosition.encode(message.vehicle, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };
    
            /**
             * Encodes the specified FeedEntity message, length delimited. Does not implicitly {@link transit_realtime.FeedEntity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {transit_realtime.FeedEntity.$Properties} message FeedEntity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeedEntity.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };
    
            /**
             * Decodes a FeedEntity message from the specified reader or buffer.
             * @function decode
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {transit_realtime.FeedEntity & transit_realtime.FeedEntity.$Shape} FeedEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeedEntity.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.FeedEntity();
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            message.id = reader.string();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            message.vehicle = $root.transit_realtime.VehiclePosition.decode(reader, reader.uint32(), $undefined, _depth + 1, message.vehicle);
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                if (!$Object.hasOwnProperty.call(message, "id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a FeedEntity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {transit_realtime.FeedEntity & transit_realtime.FeedEntity.$Shape} FeedEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeedEntity.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a FeedEntity message.
             * @function verify
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FeedEntity.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isString(message.id))
                    return "id: string expected";
                if (message.vehicle != null && $Object.hasOwnProperty.call(message, "vehicle")) {
                    var error = $root.transit_realtime.VehiclePosition.verify(message.vehicle, _depth + 1);
                    if (error)
                        return "vehicle." + error;
                }
                return null;
            };
    
            /**
             * Creates a FeedEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {transit_realtime.FeedEntity} FeedEntity
             */
            FeedEntity.fromObject = function (object, _depth) {
                if (object instanceof $root.transit_realtime.FeedEntity)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".transit_realtime.FeedEntity: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var message = new $root.transit_realtime.FeedEntity();
                if (object.id != null)
                    message.id = $String(object.id);
                if (object.vehicle != null) {
                    if (!$util.isObject(object.vehicle))
                        throw $TypeError(".transit_realtime.FeedEntity.vehicle: object expected");
                    message.vehicle = $root.transit_realtime.VehiclePosition.fromObject(object.vehicle, _depth + 1);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FeedEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {transit_realtime.FeedEntity} message FeedEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FeedEntity.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var object = {};
                if (options.defaults) {
                    object.id = "";
                    object.vehicle = null;
                }
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.vehicle != null && $Object.hasOwnProperty.call(message, "vehicle"))
                    object.vehicle = $root.transit_realtime.VehiclePosition.toObject(message.vehicle, options, _depth + 1);
                return object;
            };
    
            /**
             * Converts this FeedEntity to JSON.
             * @function toJSON
             * @memberof transit_realtime.FeedEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FeedEntity.prototype.toJSON = function() {
                return FeedEntity.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the type url for FeedEntity
             * @function getTypeUrl
             * @memberof transit_realtime.FeedEntity
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            FeedEntity.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/transit_realtime.FeedEntity";
            };
    
            return FeedEntity;
        })();
    
        transit_realtime.VehiclePosition = (function() {
    
            /**
             * Properties of a VehiclePosition.
             * @typedef {Object} transit_realtime.VehiclePosition.$Properties
             * @property {transit_realtime.TripDescriptor.$Properties|null} [trip] VehiclePosition trip
             * @property {transit_realtime.VehicleDescriptor.$Properties|null} [vehicle] VehiclePosition vehicle
             * @property {transit_realtime.Position.$Properties|null} [position] VehiclePosition position
             * @property {number|null} [currentStopSequence] VehiclePosition currentStopSequence
             * @property {string|null} [stopId] VehiclePosition stopId
             * @property {transit_realtime.VehicleStopStatus|null} [currentStatus] VehiclePosition currentStatus
             * @property {number|Long|null} [timestamp] VehiclePosition timestamp
             * @property {transit_realtime.CongestionLevel|null} [congestionLevel] VehiclePosition congestionLevel
             * @property {transit_realtime.OccupancyStatus|null} [occupancyStatus] VehiclePosition occupancyStatus
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
    
            /**
             * Properties of a VehiclePosition.
             * @memberof transit_realtime
             * @interface IVehiclePosition
             * @augments transit_realtime.VehiclePosition.$Properties
             * @deprecated Use transit_realtime.VehiclePosition.$Properties instead.
             */
    
            /**
             * Shape of a VehiclePosition.
             * @typedef {transit_realtime.VehiclePosition.$Properties} transit_realtime.VehiclePosition.$Shape
             */
    
            /**
             * Constructs a new VehiclePosition.
             * @memberof transit_realtime
             * @classdesc Represents a VehiclePosition.
             * @constructor
             * @param {transit_realtime.VehiclePosition.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            var VehiclePosition = function (properties) {
                if (properties)
                    for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };
    
            /**
             * VehiclePosition trip.
             * @member {transit_realtime.TripDescriptor.$Properties|null|undefined} trip
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.trip = null;
    
            /**
             * VehiclePosition vehicle.
             * @member {transit_realtime.VehicleDescriptor.$Properties|null|undefined} vehicle
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.vehicle = null;
    
            /**
             * VehiclePosition position.
             * @member {transit_realtime.Position.$Properties|null|undefined} position
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.position = null;
    
            /**
             * VehiclePosition currentStopSequence.
             * @member {number} currentStopSequence
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.currentStopSequence = 0;
    
            /**
             * VehiclePosition stopId.
             * @member {string} stopId
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.stopId = "";
    
            /**
             * VehiclePosition currentStatus.
             * @member {transit_realtime.VehicleStopStatus} currentStatus
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.currentStatus = 0;
    
            /**
             * VehiclePosition timestamp.
             * @member {number|Long} timestamp
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * VehiclePosition congestionLevel.
             * @member {transit_realtime.CongestionLevel} congestionLevel
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.congestionLevel = 0;
    
            /**
             * VehiclePosition occupancyStatus.
             * @member {transit_realtime.OccupancyStatus} occupancyStatus
             * @memberof transit_realtime.VehiclePosition
             * @instance
             */
            VehiclePosition.prototype.occupancyStatus = 0;
    
            /**
             * Creates a new VehiclePosition instance using the specified properties.
             * @function create
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {transit_realtime.VehiclePosition.$Properties=} [properties] Properties to set
             * @returns {transit_realtime.VehiclePosition} VehiclePosition instance
             * @type {{
             *   (properties: transit_realtime.VehiclePosition.$Shape): transit_realtime.VehiclePosition & transit_realtime.VehiclePosition.$Shape;
             *   (properties?: transit_realtime.VehiclePosition.$Properties): transit_realtime.VehiclePosition;
             * }}
             */
            VehiclePosition.create = function(properties) {
                return new VehiclePosition(properties);
            };
    
            /**
             * Encodes the specified VehiclePosition message. Does not implicitly {@link transit_realtime.VehiclePosition.verify|verify} messages.
             * @function encode
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {transit_realtime.VehiclePosition.$Properties} message VehiclePosition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VehiclePosition.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.trip != null && $Object.hasOwnProperty.call(message, "trip"))
                    $root.transit_realtime.TripDescriptor.encode(message.trip, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.timestamp);
                if (message.stopId != null && $Object.hasOwnProperty.call(message, "stopId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.stopId);
                if (message.currentStatus != null && $Object.hasOwnProperty.call(message, "currentStatus"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currentStatus);
                if (message.position != null && $Object.hasOwnProperty.call(message, "position"))
                    $root.transit_realtime.Position.encode(message.position, writer.uint32(/* id 6, wireType 2 =*/50).fork(), _depth + 1).ldelim();
                if (message.currentStopSequence != null && $Object.hasOwnProperty.call(message, "currentStopSequence"))
                    writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.currentStopSequence);
                if (message.vehicle != null && $Object.hasOwnProperty.call(message, "vehicle"))
                    $root.transit_realtime.VehicleDescriptor.encode(message.vehicle, writer.uint32(/* id 8, wireType 2 =*/66).fork(), _depth + 1).ldelim();
                if (message.congestionLevel != null && $Object.hasOwnProperty.call(message, "congestionLevel"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int32(message.congestionLevel);
                if (message.occupancyStatus != null && $Object.hasOwnProperty.call(message, "occupancyStatus"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.occupancyStatus);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };
    
            /**
             * Encodes the specified VehiclePosition message, length delimited. Does not implicitly {@link transit_realtime.VehiclePosition.verify|verify} messages.
             * @function encodeDelimited
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {transit_realtime.VehiclePosition.$Properties} message VehiclePosition message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VehiclePosition.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };
    
            /**
             * Decodes a VehiclePosition message from the specified reader or buffer.
             * @function decode
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {transit_realtime.VehiclePosition & transit_realtime.VehiclePosition.$Shape} VehiclePosition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VehiclePosition.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.VehiclePosition(), value;
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            message.trip = $root.transit_realtime.TripDescriptor.decode(reader, reader.uint32(), $undefined, _depth + 1, message.trip);
                            continue;
                        }
                    case 8: {
                            if (wireType !== 2)
                                break;
                            message.vehicle = $root.transit_realtime.VehicleDescriptor.decode(reader, reader.uint32(), $undefined, _depth + 1, message.vehicle);
                            continue;
                        }
                    case 6: {
                            if (wireType !== 2)
                                break;
                            message.position = $root.transit_realtime.Position.decode(reader, reader.uint32(), $undefined, _depth + 1, message.position);
                            continue;
                        }
                    case 7: {
                            if (wireType !== 0)
                                break;
                            message.currentStopSequence = reader.uint32();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            message.stopId = reader.string();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            value = reader.int32();
                            if ($root.transit_realtime.VehicleStopStatus[value] !== $undefined)
                                message.currentStatus = value;
                            else if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.timestamp = reader.uint64();
                            continue;
                        }
                    case 9: {
                            if (wireType !== 0)
                                break;
                            value = reader.int32();
                            if ($root.transit_realtime.CongestionLevel[value] !== $undefined)
                                message.congestionLevel = value;
                            else if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                            continue;
                        }
                    case 10: {
                            if (wireType !== 0)
                                break;
                            value = reader.int32();
                            if ($root.transit_realtime.OccupancyStatus[value] !== $undefined)
                                message.occupancyStatus = value;
                            else if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };
    
            /**
             * Decodes a VehiclePosition message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {transit_realtime.VehiclePosition & transit_realtime.VehiclePosition.$Shape} VehiclePosition
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VehiclePosition.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a VehiclePosition message.
             * @function verify
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VehiclePosition.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.trip != null && $Object.hasOwnProperty.call(message, "trip")) {
                    var error = $root.transit_realtime.TripDescriptor.verify(message.trip, _depth + 1);
                    if (error)
                        return "trip." + error;
                }
                if (message.vehicle != null && $Object.hasOwnProperty.call(message, "vehicle")) {
                    var error = $root.transit_realtime.VehicleDescriptor.verify(message.vehicle, _depth + 1);
                    if (error)
                        return "vehicle." + error;
                }
                if (message.position != null && $Object.hasOwnProperty.call(message, "position")) {
                    var error = $root.transit_realtime.Position.verify(message.position, _depth + 1);
                    if (error)
                        return "position." + error;
                }
                if (message.currentStopSequence != null && $Object.hasOwnProperty.call(message, "currentStopSequence"))
                    if (!$util.isInteger(message.currentStopSequence))
                        return "currentStopSequence: integer expected";
                if (message.stopId != null && $Object.hasOwnProperty.call(message, "stopId"))
                    if (!$util.isString(message.stopId))
                        return "stopId: string expected";
                if (message.currentStatus != null && $Object.hasOwnProperty.call(message, "currentStatus"))
                    switch (message.currentStatus) {
                    default:
                        return "currentStatus: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.congestionLevel != null && $Object.hasOwnProperty.call(message, "congestionLevel"))
                    switch (message.congestionLevel) {
                    default:
                        return "congestionLevel: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.occupancyStatus != null && $Object.hasOwnProperty.call(message, "occupancyStatus"))
                    switch (message.occupancyStatus) {
                    default:
                        return "occupancyStatus: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a VehiclePosition message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {transit_realtime.VehiclePosition} VehiclePosition
             */
            VehiclePosition.fromObject = function (object, _depth) {
                if (object instanceof $root.transit_realtime.VehiclePosition)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".transit_realtime.VehiclePosition: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var message = new $root.transit_realtime.VehiclePosition();
                if (object.trip != null) {
                    if (!$util.isObject(object.trip))
                        throw $TypeError(".transit_realtime.VehiclePosition.trip: object expected");
                    message.trip = $root.transit_realtime.TripDescriptor.fromObject(object.trip, _depth + 1);
                }
                if (object.vehicle != null) {
                    if (!$util.isObject(object.vehicle))
                        throw $TypeError(".transit_realtime.VehiclePosition.vehicle: object expected");
                    message.vehicle = $root.transit_realtime.VehicleDescriptor.fromObject(object.vehicle, _depth + 1);
                }
                if (object.position != null) {
                    if (!$util.isObject(object.position))
                        throw $TypeError(".transit_realtime.VehiclePosition.position: object expected");
                    message.position = $root.transit_realtime.Position.fromObject(object.position, _depth + 1);
                }
                if (object.currentStopSequence != null)
                    message.currentStopSequence = object.currentStopSequence >>> 0;
                if (object.stopId != null)
                    message.stopId = $String(object.stopId);
                switch (object.currentStatus) {
                case "IN_TRANSIT_TO":
                case 0:
                    message.currentStatus = 0;
                    break;
                case "STOPPED_AT":
                case 1:
                    message.currentStatus = 1;
                    break;
                case "IN_TRANSIT_FROM":
                case 2:
                    message.currentStatus = 2;
                    break;
                default:
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        message.timestamp = $util.Long.fromValue(object.timestamp, true);
                    else if (typeof object.timestamp === "string")
                        message.timestamp = $parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
                switch (object.congestionLevel) {
                case "UNKNOWN_CONGESTION_LEVEL":
                case 0:
                    message.congestionLevel = 0;
                    break;
                case "RUNNING_SMOOTHLY":
                case 1:
                    message.congestionLevel = 1;
                    break;
                case "STOP_AND_GO":
                case 2:
                    message.congestionLevel = 2;
                    break;
                case "CONGESTION":
                case 3:
                    message.congestionLevel = 3;
                    break;
                case "SEVERE_CONGESTION":
                case 4:
                    message.congestionLevel = 4;
                    break;
                default:
                }
                switch (object.occupancyStatus) {
                case "EMPTY":
                case 0:
                    message.occupancyStatus = 0;
                    break;
                case "MANY_SEATS_AVAILABLE":
                case 1:
                    message.occupancyStatus = 1;
                    break;
                case "FEW_SEATS_AVAILABLE":
                case 2:
                    message.occupancyStatus = 2;
                    break;
                case "STANDING_ROOM_ONLY":
                case 3:
                    message.occupancyStatus = 3;
                    break;
                case "CRUSHED_STANDING_ROOM_ONLY":
                case 4:
                    message.occupancyStatus = 4;
                    break;
                case "FULL":
                case 5:
                    message.occupancyStatus = 5;
                    break;
                case "NOT_ACCEPTING_PASSENGERS":
                case 6:
                    message.occupancyStatus = 6;
                    break;
                default:
                }
                return message;
            };
    
            /**
             * Creates a plain object from a VehiclePosition message. Also converts values to other types if specified.
             * @function toObject
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {transit_realtime.VehiclePosition} message VehiclePosition
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VehiclePosition.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var object = {};
                if (options.defaults) {
                    object.trip = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.timestamp = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.timestamp = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.stopId = "";
                    object.currentStatus = options.enums === $String ? "IN_TRANSIT_TO" : 0;
                    object.position = null;
                    object.currentStopSequence = 0;
                    object.vehicle = null;
                    object.congestionLevel = options.enums === $String ? "UNKNOWN_CONGESTION_LEVEL" : 0;
                    object.occupancyStatus = options.enums === $String ? "EMPTY" : 0;
                }
                if (message.trip != null && $Object.hasOwnProperty.call(message, "trip"))
                    object.trip = $root.transit_realtime.TripDescriptor.toObject(message.trip, options, _depth + 1);
                if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.timestamp = typeof message.timestamp === "number" ? $BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, true).toBigInt();
                    else if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === $String ? $String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === $String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === $Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
                if (message.stopId != null && $Object.hasOwnProperty.call(message, "stopId"))
                    object.stopId = message.stopId;
                if (message.currentStatus != null && $Object.hasOwnProperty.call(message, "currentStatus"))
                    object.currentStatus = options.enums === $String ? $root.transit_realtime.VehicleStopStatus[message.currentStatus] === $undefined ? message.currentStatus : $root.transit_realtime.VehicleStopStatus[message.currentStatus] : message.currentStatus;
                if (message.position != null && $Object.hasOwnProperty.call(message, "position"))
                    object.position = $root.transit_realtime.Position.toObject(message.position, options, _depth + 1);
                if (message.currentStopSequence != null && $Object.hasOwnProperty.call(message, "currentStopSequence"))
                    object.currentStopSequence = message.currentStopSequence;
                if (message.vehicle != null && $Object.hasOwnProperty.call(message, "vehicle"))
                    object.vehicle = $root.transit_realtime.VehicleDescriptor.toObject(message.vehicle, options, _depth + 1);
                if (message.congestionLevel != null && $Object.hasOwnProperty.call(message, "congestionLevel"))
                    object.congestionLevel = options.enums === $String ? $root.transit_realtime.CongestionLevel[message.congestionLevel] === $undefined ? message.congestionLevel : $root.transit_realtime.CongestionLevel[message.congestionLevel] : message.congestionLevel;
                if (message.occupancyStatus != null && $Object.hasOwnProperty.call(message, "occupancyStatus"))
                    object.occupancyStatus = options.enums === $String ? $root.transit_realtime.OccupancyStatus[message.occupancyStatus] === $undefined ? message.occupancyStatus : $root.transit_realtime.OccupancyStatus[message.occupancyStatus] : message.occupancyStatus;
                return object;
            };
    
            /**
             * Converts this VehiclePosition to JSON.
             * @function toJSON
             * @memberof transit_realtime.VehiclePosition
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VehiclePosition.prototype.toJSON = function() {
                return VehiclePosition.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the type url for VehiclePosition
             * @function getTypeUrl
             * @memberof transit_realtime.VehiclePosition
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            VehiclePosition.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/transit_realtime.VehiclePosition";
            };
    
            return VehiclePosition;
        })();
    
        transit_realtime.TripDescriptor = (function() {
    
            /**
             * Properties of a TripDescriptor.
             * @typedef {Object} transit_realtime.TripDescriptor.$Properties
             * @property {string|null} [tripId] TripDescriptor tripId
             * @property {string|null} [routeId] TripDescriptor routeId
             * @property {string|null} [directionId] TripDescriptor directionId
             * @property {string|null} [startTime] TripDescriptor startTime
             * @property {string|null} [startDate] TripDescriptor startDate
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
    
            /**
             * Properties of a TripDescriptor.
             * @memberof transit_realtime
             * @interface ITripDescriptor
             * @augments transit_realtime.TripDescriptor.$Properties
             * @deprecated Use transit_realtime.TripDescriptor.$Properties instead.
             */
    
            /**
             * Shape of a TripDescriptor.
             * @typedef {transit_realtime.TripDescriptor.$Properties} transit_realtime.TripDescriptor.$Shape
             */
    
            /**
             * Constructs a new TripDescriptor.
             * @memberof transit_realtime
             * @classdesc Represents a TripDescriptor.
             * @constructor
             * @param {transit_realtime.TripDescriptor.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            var TripDescriptor = function (properties) {
                if (properties)
                    for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };
    
            /**
             * TripDescriptor tripId.
             * @member {string} tripId
             * @memberof transit_realtime.TripDescriptor
             * @instance
             */
            TripDescriptor.prototype.tripId = "";
    
            /**
             * TripDescriptor routeId.
             * @member {string} routeId
             * @memberof transit_realtime.TripDescriptor
             * @instance
             */
            TripDescriptor.prototype.routeId = "";
    
            /**
             * TripDescriptor directionId.
             * @member {string} directionId
             * @memberof transit_realtime.TripDescriptor
             * @instance
             */
            TripDescriptor.prototype.directionId = "";
    
            /**
             * TripDescriptor startTime.
             * @member {string} startTime
             * @memberof transit_realtime.TripDescriptor
             * @instance
             */
            TripDescriptor.prototype.startTime = "";
    
            /**
             * TripDescriptor startDate.
             * @member {string} startDate
             * @memberof transit_realtime.TripDescriptor
             * @instance
             */
            TripDescriptor.prototype.startDate = "";
    
            /**
             * Creates a new TripDescriptor instance using the specified properties.
             * @function create
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {transit_realtime.TripDescriptor.$Properties=} [properties] Properties to set
             * @returns {transit_realtime.TripDescriptor} TripDescriptor instance
             * @type {{
             *   (properties: transit_realtime.TripDescriptor.$Shape): transit_realtime.TripDescriptor & transit_realtime.TripDescriptor.$Shape;
             *   (properties?: transit_realtime.TripDescriptor.$Properties): transit_realtime.TripDescriptor;
             * }}
             */
            TripDescriptor.create = function(properties) {
                return new TripDescriptor(properties);
            };
    
            /**
             * Encodes the specified TripDescriptor message. Does not implicitly {@link transit_realtime.TripDescriptor.verify|verify} messages.
             * @function encode
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {transit_realtime.TripDescriptor.$Properties} message TripDescriptor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TripDescriptor.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.tripId != null && $Object.hasOwnProperty.call(message, "tripId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.tripId);
                if (message.routeId != null && $Object.hasOwnProperty.call(message, "routeId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.routeId);
                if (message.directionId != null && $Object.hasOwnProperty.call(message, "directionId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.directionId);
                if (message.startTime != null && $Object.hasOwnProperty.call(message, "startTime"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.startTime);
                if (message.startDate != null && $Object.hasOwnProperty.call(message, "startDate"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.startDate);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };
    
            /**
             * Encodes the specified TripDescriptor message, length delimited. Does not implicitly {@link transit_realtime.TripDescriptor.verify|verify} messages.
             * @function encodeDelimited
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {transit_realtime.TripDescriptor.$Properties} message TripDescriptor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TripDescriptor.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };
    
            /**
             * Decodes a TripDescriptor message from the specified reader or buffer.
             * @function decode
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {transit_realtime.TripDescriptor & transit_realtime.TripDescriptor.$Shape} TripDescriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TripDescriptor.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripDescriptor();
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            message.tripId = reader.string();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            message.routeId = reader.string();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            message.directionId = reader.string();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            message.startTime = reader.string();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            message.startDate = reader.string();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };
    
            /**
             * Decodes a TripDescriptor message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {transit_realtime.TripDescriptor & transit_realtime.TripDescriptor.$Shape} TripDescriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TripDescriptor.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TripDescriptor message.
             * @function verify
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TripDescriptor.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.tripId != null && $Object.hasOwnProperty.call(message, "tripId"))
                    if (!$util.isString(message.tripId))
                        return "tripId: string expected";
                if (message.routeId != null && $Object.hasOwnProperty.call(message, "routeId"))
                    if (!$util.isString(message.routeId))
                        return "routeId: string expected";
                if (message.directionId != null && $Object.hasOwnProperty.call(message, "directionId"))
                    if (!$util.isString(message.directionId))
                        return "directionId: string expected";
                if (message.startTime != null && $Object.hasOwnProperty.call(message, "startTime"))
                    if (!$util.isString(message.startTime))
                        return "startTime: string expected";
                if (message.startDate != null && $Object.hasOwnProperty.call(message, "startDate"))
                    if (!$util.isString(message.startDate))
                        return "startDate: string expected";
                return null;
            };
    
            /**
             * Creates a TripDescriptor message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {transit_realtime.TripDescriptor} TripDescriptor
             */
            TripDescriptor.fromObject = function (object, _depth) {
                if (object instanceof $root.transit_realtime.TripDescriptor)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".transit_realtime.TripDescriptor: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var message = new $root.transit_realtime.TripDescriptor();
                if (object.tripId != null)
                    message.tripId = $String(object.tripId);
                if (object.routeId != null)
                    message.routeId = $String(object.routeId);
                if (object.directionId != null)
                    message.directionId = $String(object.directionId);
                if (object.startTime != null)
                    message.startTime = $String(object.startTime);
                if (object.startDate != null)
                    message.startDate = $String(object.startDate);
                return message;
            };
    
            /**
             * Creates a plain object from a TripDescriptor message. Also converts values to other types if specified.
             * @function toObject
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {transit_realtime.TripDescriptor} message TripDescriptor
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TripDescriptor.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var object = {};
                if (options.defaults) {
                    object.tripId = "";
                    object.routeId = "";
                    object.directionId = "";
                    object.startTime = "";
                    object.startDate = "";
                }
                if (message.tripId != null && $Object.hasOwnProperty.call(message, "tripId"))
                    object.tripId = message.tripId;
                if (message.routeId != null && $Object.hasOwnProperty.call(message, "routeId"))
                    object.routeId = message.routeId;
                if (message.directionId != null && $Object.hasOwnProperty.call(message, "directionId"))
                    object.directionId = message.directionId;
                if (message.startTime != null && $Object.hasOwnProperty.call(message, "startTime"))
                    object.startTime = message.startTime;
                if (message.startDate != null && $Object.hasOwnProperty.call(message, "startDate"))
                    object.startDate = message.startDate;
                return object;
            };
    
            /**
             * Converts this TripDescriptor to JSON.
             * @function toJSON
             * @memberof transit_realtime.TripDescriptor
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TripDescriptor.prototype.toJSON = function() {
                return TripDescriptor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the type url for TripDescriptor
             * @function getTypeUrl
             * @memberof transit_realtime.TripDescriptor
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            TripDescriptor.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/transit_realtime.TripDescriptor";
            };
    
            return TripDescriptor;
        })();
    
        transit_realtime.VehicleDescriptor = (function() {
    
            /**
             * Properties of a VehicleDescriptor.
             * @typedef {Object} transit_realtime.VehicleDescriptor.$Properties
             * @property {string|null} [id] VehicleDescriptor id
             * @property {string|null} [label] VehicleDescriptor label
             * @property {string|null} [licensePlate] VehicleDescriptor licensePlate
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
    
            /**
             * Properties of a VehicleDescriptor.
             * @memberof transit_realtime
             * @interface IVehicleDescriptor
             * @augments transit_realtime.VehicleDescriptor.$Properties
             * @deprecated Use transit_realtime.VehicleDescriptor.$Properties instead.
             */
    
            /**
             * Shape of a VehicleDescriptor.
             * @typedef {transit_realtime.VehicleDescriptor.$Properties} transit_realtime.VehicleDescriptor.$Shape
             */
    
            /**
             * Constructs a new VehicleDescriptor.
             * @memberof transit_realtime
             * @classdesc Represents a VehicleDescriptor.
             * @constructor
             * @param {transit_realtime.VehicleDescriptor.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            var VehicleDescriptor = function (properties) {
                if (properties)
                    for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };
    
            /**
             * VehicleDescriptor id.
             * @member {string} id
             * @memberof transit_realtime.VehicleDescriptor
             * @instance
             */
            VehicleDescriptor.prototype.id = "";
    
            /**
             * VehicleDescriptor label.
             * @member {string} label
             * @memberof transit_realtime.VehicleDescriptor
             * @instance
             */
            VehicleDescriptor.prototype.label = "";
    
            /**
             * VehicleDescriptor licensePlate.
             * @member {string} licensePlate
             * @memberof transit_realtime.VehicleDescriptor
             * @instance
             */
            VehicleDescriptor.prototype.licensePlate = "";
    
            /**
             * Creates a new VehicleDescriptor instance using the specified properties.
             * @function create
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {transit_realtime.VehicleDescriptor.$Properties=} [properties] Properties to set
             * @returns {transit_realtime.VehicleDescriptor} VehicleDescriptor instance
             * @type {{
             *   (properties: transit_realtime.VehicleDescriptor.$Shape): transit_realtime.VehicleDescriptor & transit_realtime.VehicleDescriptor.$Shape;
             *   (properties?: transit_realtime.VehicleDescriptor.$Properties): transit_realtime.VehicleDescriptor;
             * }}
             */
            VehicleDescriptor.create = function(properties) {
                return new VehicleDescriptor(properties);
            };
    
            /**
             * Encodes the specified VehicleDescriptor message. Does not implicitly {@link transit_realtime.VehicleDescriptor.verify|verify} messages.
             * @function encode
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {transit_realtime.VehicleDescriptor.$Properties} message VehicleDescriptor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VehicleDescriptor.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.label);
                if (message.licensePlate != null && $Object.hasOwnProperty.call(message, "licensePlate"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.licensePlate);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };
    
            /**
             * Encodes the specified VehicleDescriptor message, length delimited. Does not implicitly {@link transit_realtime.VehicleDescriptor.verify|verify} messages.
             * @function encodeDelimited
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {transit_realtime.VehicleDescriptor.$Properties} message VehicleDescriptor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VehicleDescriptor.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };
    
            /**
             * Decodes a VehicleDescriptor message from the specified reader or buffer.
             * @function decode
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {transit_realtime.VehicleDescriptor & transit_realtime.VehicleDescriptor.$Shape} VehicleDescriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VehicleDescriptor.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.VehicleDescriptor();
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            message.id = reader.string();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            message.label = reader.string();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            message.licensePlate = reader.string();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };
    
            /**
             * Decodes a VehicleDescriptor message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {transit_realtime.VehicleDescriptor & transit_realtime.VehicleDescriptor.$Shape} VehicleDescriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VehicleDescriptor.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a VehicleDescriptor message.
             * @function verify
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VehicleDescriptor.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                    if (!$util.isString(message.label))
                        return "label: string expected";
                if (message.licensePlate != null && $Object.hasOwnProperty.call(message, "licensePlate"))
                    if (!$util.isString(message.licensePlate))
                        return "licensePlate: string expected";
                return null;
            };
    
            /**
             * Creates a VehicleDescriptor message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {transit_realtime.VehicleDescriptor} VehicleDescriptor
             */
            VehicleDescriptor.fromObject = function (object, _depth) {
                if (object instanceof $root.transit_realtime.VehicleDescriptor)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".transit_realtime.VehicleDescriptor: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var message = new $root.transit_realtime.VehicleDescriptor();
                if (object.id != null)
                    message.id = $String(object.id);
                if (object.label != null)
                    message.label = $String(object.label);
                if (object.licensePlate != null)
                    message.licensePlate = $String(object.licensePlate);
                return message;
            };
    
            /**
             * Creates a plain object from a VehicleDescriptor message. Also converts values to other types if specified.
             * @function toObject
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {transit_realtime.VehicleDescriptor} message VehicleDescriptor
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VehicleDescriptor.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var object = {};
                if (options.defaults) {
                    object.id = "";
                    object.label = "";
                    object.licensePlate = "";
                }
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                    object.label = message.label;
                if (message.licensePlate != null && $Object.hasOwnProperty.call(message, "licensePlate"))
                    object.licensePlate = message.licensePlate;
                return object;
            };
    
            /**
             * Converts this VehicleDescriptor to JSON.
             * @function toJSON
             * @memberof transit_realtime.VehicleDescriptor
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VehicleDescriptor.prototype.toJSON = function() {
                return VehicleDescriptor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the type url for VehicleDescriptor
             * @function getTypeUrl
             * @memberof transit_realtime.VehicleDescriptor
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            VehicleDescriptor.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/transit_realtime.VehicleDescriptor";
            };
    
            return VehicleDescriptor;
        })();
    
        transit_realtime.Position = (function() {
    
            /**
             * Properties of a Position.
             * @typedef {Object} transit_realtime.Position.$Properties
             * @property {number} latitude Position latitude
             * @property {number} longitude Position longitude
             * @property {number|null} [bearing] Position bearing
             * @property {number|null} [odometer] Position odometer
             * @property {number|null} [speed] Position speed
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
    
            /**
             * Properties of a Position.
             * @memberof transit_realtime
             * @interface IPosition
             * @augments transit_realtime.Position.$Properties
             * @deprecated Use transit_realtime.Position.$Properties instead.
             */
    
            /**
             * Shape of a Position.
             * @typedef {transit_realtime.Position.$Properties} transit_realtime.Position.$Shape
             */
    
            /**
             * Constructs a new Position.
             * @memberof transit_realtime
             * @classdesc Represents a Position.
             * @constructor
             * @param {transit_realtime.Position.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            var Position = function (properties) {
                if (properties)
                    for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };
    
            /**
             * Position latitude.
             * @member {number} latitude
             * @memberof transit_realtime.Position
             * @instance
             */
            Position.prototype.latitude = 0;
    
            /**
             * Position longitude.
             * @member {number} longitude
             * @memberof transit_realtime.Position
             * @instance
             */
            Position.prototype.longitude = 0;
    
            /**
             * Position bearing.
             * @member {number} bearing
             * @memberof transit_realtime.Position
             * @instance
             */
            Position.prototype.bearing = 0;
    
            /**
             * Position odometer.
             * @member {number} odometer
             * @memberof transit_realtime.Position
             * @instance
             */
            Position.prototype.odometer = 0;
    
            /**
             * Position speed.
             * @member {number} speed
             * @memberof transit_realtime.Position
             * @instance
             */
            Position.prototype.speed = 0;
    
            /**
             * Creates a new Position instance using the specified properties.
             * @function create
             * @memberof transit_realtime.Position
             * @static
             * @param {transit_realtime.Position.$Properties=} [properties] Properties to set
             * @returns {transit_realtime.Position} Position instance
             * @type {{
             *   (properties: transit_realtime.Position.$Shape): transit_realtime.Position & transit_realtime.Position.$Shape;
             *   (properties?: transit_realtime.Position.$Properties): transit_realtime.Position;
             * }}
             */
            Position.create = function(properties) {
                return new Position(properties);
            };
    
            /**
             * Encodes the specified Position message. Does not implicitly {@link transit_realtime.Position.verify|verify} messages.
             * @function encode
             * @memberof transit_realtime.Position
             * @static
             * @param {transit_realtime.Position.$Properties} message Position message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Position.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.latitude);
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.longitude);
                if (message.bearing != null && $Object.hasOwnProperty.call(message, "bearing"))
                    writer.uint32(/* id 3, wireType 5 =*/29).float(message.bearing);
                if (message.odometer != null && $Object.hasOwnProperty.call(message, "odometer"))
                    writer.uint32(/* id 4, wireType 5 =*/37).float(message.odometer);
                if (message.speed != null && $Object.hasOwnProperty.call(message, "speed"))
                    writer.uint32(/* id 5, wireType 5 =*/45).float(message.speed);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };
    
            /**
             * Encodes the specified Position message, length delimited. Does not implicitly {@link transit_realtime.Position.verify|verify} messages.
             * @function encodeDelimited
             * @memberof transit_realtime.Position
             * @static
             * @param {transit_realtime.Position.$Properties} message Position message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Position.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };
    
            /**
             * Decodes a Position message from the specified reader or buffer.
             * @function decode
             * @memberof transit_realtime.Position
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {transit_realtime.Position & transit_realtime.Position.$Shape} Position
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Position.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.Position();
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 5)
                                break;
                            message.latitude = reader.float();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 5)
                                break;
                            message.longitude = reader.float();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 5)
                                break;
                            message.bearing = reader.float();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 5)
                                break;
                            message.odometer = reader.float();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 5)
                                break;
                            message.speed = reader.float();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                if (!$Object.hasOwnProperty.call(message, "latitude"))
                    throw $util.ProtocolError("missing required 'latitude'", { instance: message });
                if (!$Object.hasOwnProperty.call(message, "longitude"))
                    throw $util.ProtocolError("missing required 'longitude'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Position message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof transit_realtime.Position
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {transit_realtime.Position & transit_realtime.Position.$Shape} Position
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Position.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Position message.
             * @function verify
             * @memberof transit_realtime.Position
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Position.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (typeof message.latitude !== "number")
                    return "latitude: number expected";
                if (typeof message.longitude !== "number")
                    return "longitude: number expected";
                if (message.bearing != null && $Object.hasOwnProperty.call(message, "bearing"))
                    if (typeof message.bearing !== "number")
                        return "bearing: number expected";
                if (message.odometer != null && $Object.hasOwnProperty.call(message, "odometer"))
                    if (typeof message.odometer !== "number")
                        return "odometer: number expected";
                if (message.speed != null && $Object.hasOwnProperty.call(message, "speed"))
                    if (typeof message.speed !== "number")
                        return "speed: number expected";
                return null;
            };
    
            /**
             * Creates a Position message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof transit_realtime.Position
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {transit_realtime.Position} Position
             */
            Position.fromObject = function (object, _depth) {
                if (object instanceof $root.transit_realtime.Position)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".transit_realtime.Position: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var message = new $root.transit_realtime.Position();
                if (object.latitude != null)
                    message.latitude = $Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = $Number(object.longitude);
                if (object.bearing != null)
                    message.bearing = $Number(object.bearing);
                if (object.odometer != null)
                    message.odometer = $Number(object.odometer);
                if (object.speed != null)
                    message.speed = $Number(object.speed);
                return message;
            };
    
            /**
             * Creates a plain object from a Position message. Also converts values to other types if specified.
             * @function toObject
             * @memberof transit_realtime.Position
             * @static
             * @param {transit_realtime.Position} message Position
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Position.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var object = {};
                if (options.defaults) {
                    object.latitude = 0;
                    object.longitude = 0;
                    object.bearing = 0;
                    object.odometer = 0;
                    object.speed = 0;
                }
                if (message.latitude != null && $Object.hasOwnProperty.call(message, "latitude"))
                    object.latitude = options.json && !$isFinite(message.latitude) ? $String(message.latitude) : message.latitude;
                if (message.longitude != null && $Object.hasOwnProperty.call(message, "longitude"))
                    object.longitude = options.json && !$isFinite(message.longitude) ? $String(message.longitude) : message.longitude;
                if (message.bearing != null && $Object.hasOwnProperty.call(message, "bearing"))
                    object.bearing = options.json && !$isFinite(message.bearing) ? $String(message.bearing) : message.bearing;
                if (message.odometer != null && $Object.hasOwnProperty.call(message, "odometer"))
                    object.odometer = options.json && !$isFinite(message.odometer) ? $String(message.odometer) : message.odometer;
                if (message.speed != null && $Object.hasOwnProperty.call(message, "speed"))
                    object.speed = options.json && !$isFinite(message.speed) ? $String(message.speed) : message.speed;
                return object;
            };
    
            /**
             * Converts this Position to JSON.
             * @function toJSON
             * @memberof transit_realtime.Position
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Position.prototype.toJSON = function() {
                return Position.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the type url for Position
             * @function getTypeUrl
             * @memberof transit_realtime.Position
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Position.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/transit_realtime.Position";
            };
    
            return Position;
        })();
    
        /**
         * VehicleStopStatus enum.
         * @name transit_realtime.VehicleStopStatus
         * @enum {number}
         * @property {number} IN_TRANSIT_TO=0 IN_TRANSIT_TO value
         * @property {number} STOPPED_AT=1 STOPPED_AT value
         * @property {number} IN_TRANSIT_FROM=2 IN_TRANSIT_FROM value
         */
        transit_realtime.VehicleStopStatus = (function() {
            var valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "IN_TRANSIT_TO"] = 0;
            values[valuesById[1] = "STOPPED_AT"] = 1;
            values[valuesById[2] = "IN_TRANSIT_FROM"] = 2;
            return values;
        })();
    
        /**
         * CongestionLevel enum.
         * @name transit_realtime.CongestionLevel
         * @enum {number}
         * @property {number} UNKNOWN_CONGESTION_LEVEL=0 UNKNOWN_CONGESTION_LEVEL value
         * @property {number} RUNNING_SMOOTHLY=1 RUNNING_SMOOTHLY value
         * @property {number} STOP_AND_GO=2 STOP_AND_GO value
         * @property {number} CONGESTION=3 CONGESTION value
         * @property {number} SEVERE_CONGESTION=4 SEVERE_CONGESTION value
         */
        transit_realtime.CongestionLevel = (function() {
            var valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_CONGESTION_LEVEL"] = 0;
            values[valuesById[1] = "RUNNING_SMOOTHLY"] = 1;
            values[valuesById[2] = "STOP_AND_GO"] = 2;
            values[valuesById[3] = "CONGESTION"] = 3;
            values[valuesById[4] = "SEVERE_CONGESTION"] = 4;
            return values;
        })();
    
        /**
         * OccupancyStatus enum.
         * @name transit_realtime.OccupancyStatus
         * @enum {number}
         * @property {number} EMPTY=0 EMPTY value
         * @property {number} MANY_SEATS_AVAILABLE=1 MANY_SEATS_AVAILABLE value
         * @property {number} FEW_SEATS_AVAILABLE=2 FEW_SEATS_AVAILABLE value
         * @property {number} STANDING_ROOM_ONLY=3 STANDING_ROOM_ONLY value
         * @property {number} CRUSHED_STANDING_ROOM_ONLY=4 CRUSHED_STANDING_ROOM_ONLY value
         * @property {number} FULL=5 FULL value
         * @property {number} NOT_ACCEPTING_PASSENGERS=6 NOT_ACCEPTING_PASSENGERS value
         */
        transit_realtime.OccupancyStatus = (function() {
            var valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "EMPTY"] = 0;
            values[valuesById[1] = "MANY_SEATS_AVAILABLE"] = 1;
            values[valuesById[2] = "FEW_SEATS_AVAILABLE"] = 2;
            values[valuesById[3] = "STANDING_ROOM_ONLY"] = 3;
            values[valuesById[4] = "CRUSHED_STANDING_ROOM_ONLY"] = 4;
            values[valuesById[5] = "FULL"] = 5;
            values[valuesById[6] = "NOT_ACCEPTING_PASSENGERS"] = 6;
            return values;
        })();
    
        return transit_realtime;
    })();

    return $root;
});
