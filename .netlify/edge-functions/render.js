var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value2) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key2] = value2;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value2) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value2);
  return value2;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value2) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
};
var __privateSet = (obj, member, value2, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value2) : member.set(obj, value2);
  return value2;
};

// .svelte-kit/output/server/chunks/index3.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object" || typeof a2 === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k2 in props)
    if (!keys.has(k2) && k2[0] !== "$")
      rest[k2] = props[k2];
  return rest;
}
function set_current_component(component6) {
  current_component = component6;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value2 = attributes[name];
    if (value2 === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value2)
        str += " " + name;
    } else if (value2 != null) {
      str += ` ${name}="${value2}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value2 = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value2;
  }
  for (const name in style_directive) {
    const value2 = style_directive[name];
    if (value2) {
      style_object[name] = value2;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(value2, is_attr = false) {
  const str = String(value2);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i2 = pattern2.lastIndex - 1;
    const ch = str[i2];
    escaped2 += str.substring(last, i2) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i2 + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value2) {
  const should_escape = typeof value2 === "string" || value2 && typeof value2 === "object";
  return should_escape ? escape(value2, true) : value2;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component6, name) {
  if (!component6 || !component6.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component6;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value2, boolean) {
  if (value2 == null || boolean && !value2)
    return "";
  const assignment = boolean && value2 === true ? "" : `="${escape(value2, true)}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
var globals, current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_index3 = __esm({
  ".svelte-kit/output/server/chunks/index3.js"() {
    globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    _boolean_attributes = [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/public.js
var PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_API_URL;
var init_public = __esm({
  ".svelte-kit/output/server/chunks/public.js"() {
    PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
    PUBLIC_SUPABASE_API_URL = "http://localhost:54321";
  }
});

// node_modules/.pnpm/cross-fetch@3.1.5/node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/.pnpm/cross-fetch@3.1.5/node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var global2 = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F2() {
        this.fetch = false;
        this.DOMException = global2.DOMException;
      }
      F2.prototype = global2;
      return new F2();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e2) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value2) {
          if (typeof value2 !== "string") {
            value2 = String(value2);
          }
          return value2;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value2 = items.shift();
              return { done: value2 === void 0, value: value2 };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers2(headers) {
          this.map = {};
          if (headers instanceof Headers2) {
            headers.forEach(function(value2, name) {
              this.append(name, value2);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers2.prototype.append = function(name, value2) {
          name = normalizeName(name);
          value2 = normalizeValue(value2);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value2 : value2;
        };
        Headers2.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers2.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers2.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers2.prototype.set = function(name, value2) {
          this.map[normalizeName(name)] = normalizeValue(value2);
        };
        Headers2.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers2.prototype.keys = function() {
          var items = [];
          this.forEach(function(value2, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.values = function() {
          var items = [];
          this.forEach(function(value2) {
            items.push(value2);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.entries = function() {
          var items = [];
          this.forEach(function(value2, name) {
            items.push([name, value2]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars2 = new Array(view.length);
          for (var i2 = 0; i2 < view.length; i2++) {
            chars2[i2] = String.fromCharCode(view[i2]);
          }
          return chars2.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode4);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request2(input, options2) {
          options2 = options2 || {};
          var body = options2.body;
          if (input instanceof Request2) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options2.headers) {
              this.headers = new Headers2(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options2.credentials || this.credentials || "same-origin";
          if (options2.headers || !this.headers) {
            this.headers = new Headers2(options2.headers);
          }
          this.method = normalizeMethod(options2.method || this.method || "GET");
          this.mode = options2.mode || this.mode || null;
          this.signal = options2.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request2.prototype.clone = function() {
          return new Request2(this, { body: this._bodyInit });
        };
        function decode4(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value2 = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value2));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers2();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key2 = parts.shift().trim();
            if (key2) {
              var value2 = parts.join(":").trim();
              headers.append(key2, value2);
            }
          });
          return headers;
        }
        Body.call(Request2.prototype);
        function Response2(bodyInit, options2) {
          if (!options2) {
            options2 = {};
          }
          this.type = "default";
          this.status = options2.status === void 0 ? 200 : options2.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options2 ? options2.statusText : "OK";
          this.headers = new Headers2(options2.headers);
          this.url = options2.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response2.prototype);
        Response2.prototype.clone = function() {
          return new Response2(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers2(this.headers),
            url: this.url
          });
        };
        Response2.error = function() {
          var response = new Response2(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response2.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response2(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error2 = Error(message);
            this.stack = error2.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init2) {
          return new Promise(function(resolve, reject) {
            var request = new Request2(input, init2);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options2 = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options2.url = "responseURL" in xhr ? xhr.responseURL : options2.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response2(body, options2));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value2, name) {
              xhr.setRequestHeader(name, value2);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers2;
          self2.Request = Request2;
          self2.Response = Response2;
        }
        exports2.Headers = Headers2;
        exports2.Request = Request2;
        exports2.Response = Response2;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/helper.js
var __awaiter, resolveFetch;
var init_helper = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/helper.js"() {
    __awaiter = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
          return yield (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).fetch(...args);
        });
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/types.js
var FunctionsError, FunctionsFetchError, FunctionsRelayError, FunctionsHttpError;
var init_types = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/types.js"() {
    FunctionsError = class extends Error {
      constructor(message, name = "FunctionsError", context) {
        super(message);
        super.name = name;
        this.context = context;
      }
    };
    FunctionsFetchError = class extends FunctionsError {
      constructor(context) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
      }
    };
    FunctionsRelayError = class extends FunctionsError {
      constructor(context) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
      }
    };
    FunctionsHttpError = class extends FunctionsError {
      constructor(context) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var __awaiter2, FunctionsClient;
var init_FunctionsClient = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js"() {
    init_helper();
    init_types();
    __awaiter2 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    FunctionsClient = class {
      constructor(url, { headers = {}, customFetch } = {}) {
        this.url = url;
        this.headers = headers;
        this.fetch = resolveFetch(customFetch);
      }
      /**
       * Updates the authorization header
       * @param token - the new jwt token sent in the authorisation header
       */
      setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
      }
      /**
       * Invokes a function
       * @param functionName - The name of the Function to invoke.
       * @param options - Options for invoking the Function.
       */
      invoke(functionName, options2 = {}) {
        var _a;
        return __awaiter2(this, void 0, void 0, function* () {
          try {
            const { headers, method, body: functionArgs } = options2;
            let _headers = {};
            let body;
            if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
              if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                _headers["Content-Type"] = "application/octet-stream";
                body = functionArgs;
              } else if (typeof functionArgs === "string") {
                _headers["Content-Type"] = "text/plain";
                body = functionArgs;
              } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
                body = functionArgs;
              } else {
                _headers["Content-Type"] = "application/json";
                body = JSON.stringify(functionArgs);
              }
            }
            const response = yield this.fetch(`${this.url}/${functionName}`, {
              method: method || "POST",
              // headers priority is (high to low):
              // 1. invoke-level headers
              // 2. client-level headers
              // 3. default Content-Type header
              headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
              body
            }).catch((fetchError) => {
              throw new FunctionsFetchError(fetchError);
            });
            const isRelayError = response.headers.get("x-relay-error");
            if (isRelayError && isRelayError === "true") {
              throw new FunctionsRelayError(response);
            }
            if (!response.ok) {
              throw new FunctionsHttpError(response);
            }
            let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
            let data;
            if (responseType === "application/json") {
              data = yield response.json();
            } else if (responseType === "application/octet-stream") {
              data = yield response.blob();
            } else if (responseType === "multipart/form-data") {
              data = yield response.formData();
            } else {
              data = yield response.text();
            }
            return { data, error: null };
          } catch (error2) {
            return { data: null, error: error2 };
          }
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/index.js
var init_module = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.1/node_modules/@supabase/functions-js/dist/module/index.js"() {
    init_FunctionsClient();
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js
var import_cross_fetch, PostgrestBuilder;
var init_PostgrestBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js"() {
    import_cross_fetch = __toESM(require_browser_ponyfill());
    PostgrestBuilder = class {
      constructor(builder) {
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.isMaybeSingle = builder.isMaybeSingle;
        if (builder.fetch) {
          this.fetch = builder.fetch;
        } else if (typeof fetch === "undefined") {
          this.fetch = import_cross_fetch.default;
        } else {
          this.fetch = fetch;
        }
      }
      /**
       * If there's an error with the query, throwOnError will reject the promise by
       * throwing the error instead of returning it as part of a successful response.
       *
       * {@link https://github.com/supabase/supabase-js/issues/92}
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      then(onfulfilled, onrejected) {
        if (this.schema === void 0) {
        } else if (["GET", "HEAD"].includes(this.method)) {
          this.headers["Accept-Profile"] = this.schema;
        } else {
          this.headers["Content-Profile"] = this.schema;
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
          this.headers["Content-Type"] = "application/json";
        }
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal
        }).then(async (res2) => {
          var _a, _b, _c;
          let error2 = null;
          let data = null;
          let count = null;
          let status = res2.status;
          let statusText = res2.statusText;
          if (res2.ok) {
            if (this.method !== "HEAD") {
              const body = await res2.text();
              if (body === "") {
              } else if (this.headers["Accept"] === "text/csv") {
                data = body;
              } else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) {
                data = body;
              } else {
                data = JSON.parse(body);
              }
            }
            const countHeader = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
            const contentRange = (_b = res2.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
            if (countHeader && contentRange && contentRange.length > 1) {
              count = parseInt(contentRange[1]);
            }
            if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
              if (data.length > 1) {
                error2 = {
                  // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                  code: "PGRST116",
                  details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: "JSON object requested, multiple (or no) rows returned"
                };
                data = null;
                count = null;
                status = 406;
                statusText = "Not Acceptable";
              } else if (data.length === 1) {
                data = data[0];
              } else {
                data = null;
              }
            }
          } else {
            const body = await res2.text();
            try {
              error2 = JSON.parse(body);
              if (Array.isArray(error2) && res2.status === 404) {
                data = [];
                error2 = null;
                status = 200;
                statusText = "OK";
              }
            } catch (_d) {
              if (res2.status === 404 && body === "") {
                status = 204;
                statusText = "No Content";
              } else {
                error2 = {
                  message: body
                };
              }
            }
            if (error2 && this.isMaybeSingle && ((_c = error2 === null || error2 === void 0 ? void 0 : error2.details) === null || _c === void 0 ? void 0 : _c.includes("Results contain 0 rows"))) {
              error2 = null;
              status = 200;
              statusText = "OK";
            }
            if (error2 && this.shouldThrowOnError) {
              throw error2;
            }
          }
          const postgrestResponse = {
            error: error2,
            data,
            count,
            status,
            statusText
          };
          return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
          res = res.catch((fetchError) => {
            var _a, _b, _c;
            return {
              error: {
                message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                hint: "",
                code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
              },
              data: null,
              count: null,
              status: 0,
              statusText: ""
            };
          });
        }
        return res.then(onfulfilled, onrejected);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js
var PostgrestTransformBuilder;
var init_PostgrestTransformBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js"() {
    init_PostgrestBuilder();
    PostgrestTransformBuilder = class extends PostgrestBuilder {
      /**
       * Perform a SELECT on the query result.
       *
       * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
       * return modified rows. By calling this method, modified rows are returned in
       * `data`.
       *
       * @param columns - The columns to retrieve, separated by commas
       */
      select(columns) {
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c2) => {
          if (/\s/.test(c2) && !quoted2) {
            return "";
          }
          if (c2 === '"') {
            quoted2 = !quoted2;
          }
          return c2;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (this.headers["Prefer"]) {
          this.headers["Prefer"] += ",";
        }
        this.headers["Prefer"] += "return=representation";
        return this;
      }
      /**
       * Order the query result by `column`.
       *
       * You can call this method multiple times to order by multiple columns.
       *
       * You can order foreign tables, but it doesn't affect the ordering of the
       * current table.
       *
       * @param column - The column to order by
       * @param options - Named parameters
       * @param options.ascending - If `true`, the result will be in ascending order
       * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
       * `null`s appear last.
       * @param options.foreignTable - Set this to order a foreign table by foreign
       * columns
       */
      order(column, { ascending = true, nullsFirst, foreignTable } = {}) {
        const key2 = foreignTable ? `${foreignTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key2);
        this.url.searchParams.set(key2, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
      }
      /**
       * Limit the query result by `count`.
       *
       * @param count - The maximum number of rows to return
       * @param options - Named parameters
       * @param options.foreignTable - Set this to limit rows of foreign tables
       * instead of the current table
       */
      limit(count, { foreignTable } = {}) {
        const key2 = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(key2, `${count}`);
        return this;
      }
      /**
       * Limit the query result by `from` and `to` inclusively.
       *
       * @param from - The starting index from which to limit the result
       * @param to - The last index to which to limit the result
       * @param options - Named parameters
       * @param options.foreignTable - Set this to limit rows of foreign tables
       * instead of the current table
       */
      range(from, to, { foreignTable } = {}) {
        const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
        const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
      }
      /**
       * Set the AbortSignal for the fetch request.
       *
       * @param signal - The AbortSignal to use for the fetch request
       */
      abortSignal(signal) {
        this.signal = signal;
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be one row (e.g. using `.limit(1)`), otherwise this
       * returns an error.
       */
      single() {
        this.headers["Accept"] = "application/vnd.pgrst.object+json";
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
       * this returns an error.
       */
      maybeSingle() {
        if (this.method === "GET") {
          this.headers["Accept"] = "application/json";
        } else {
          this.headers["Accept"] = "application/vnd.pgrst.object+json";
        }
        this.isMaybeSingle = true;
        return this;
      }
      /**
       * Return `data` as a string in CSV format.
       */
      csv() {
        this.headers["Accept"] = "text/csv";
        return this;
      }
      /**
       * Return `data` as an object in [GeoJSON](https://geojson.org) format.
       */
      geojson() {
        this.headers["Accept"] = "application/geo+json";
        return this;
      }
      /**
       * Return `data` as the EXPLAIN plan for the query.
       *
       * @param options - Named parameters
       *
       * @param options.analyze - If `true`, the query will be executed and the
       * actual run time will be returned
       *
       * @param options.verbose - If `true`, the query identifier will be returned
       * and `data` will include the output columns of the query
       *
       * @param options.settings - If `true`, include information on configuration
       * parameters that affect query planning
       *
       * @param options.buffers - If `true`, include information on buffer usage
       *
       * @param options.wal - If `true`, include information on WAL record generation
       *
       * @param options.format - The format of the output, can be `"text"` (default)
       * or `"json"`
       */
      explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        const options2 = [
          analyze ? "analyze" : null,
          verbose ? "verbose" : null,
          settings ? "settings" : null,
          buffers ? "buffers" : null,
          wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = this.headers["Accept"];
        this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options2};`;
        if (format === "json")
          return this;
        else
          return this;
      }
      /**
       * Rollback the query.
       *
       * `data` will still be returned, but the query is not committed.
       */
      rollback() {
        var _a;
        if (((_a = this.headers["Prefer"]) !== null && _a !== void 0 ? _a : "").trim().length > 0) {
          this.headers["Prefer"] += ",tx=rollback";
        } else {
          this.headers["Prefer"] = "tx=rollback";
        }
        return this;
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       */
      returns() {
        return this;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js
var PostgrestFilterBuilder;
var init_PostgrestFilterBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js"() {
    init_PostgrestTransformBuilder();
    PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
      /**
       * Match only rows where `column` is equal to `value`.
       *
       * To check if the value of `column` is NULL, you should use `.is()` instead.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      eq(column, value2) {
        this.url.searchParams.append(column, `eq.${value2}`);
        return this;
      }
      /**
       * Match only rows where `column` is not equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      neq(column, value2) {
        this.url.searchParams.append(column, `neq.${value2}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gt(column, value2) {
        this.url.searchParams.append(column, `gt.${value2}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gte(column, value2) {
        this.url.searchParams.append(column, `gte.${value2}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lt(column, value2) {
        this.url.searchParams.append(column, `lt.${value2}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lte(column, value2) {
        this.url.searchParams.append(column, `lte.${value2}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-sensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      like(column, pattern2) {
        this.url.searchParams.append(column, `like.${pattern2}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-insensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      ilike(column, pattern2) {
        this.url.searchParams.append(column, `ilike.${pattern2}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` IS `value`.
       *
       * For non-boolean columns, this is only relevant for checking if the value of
       * `column` is NULL by setting `value` to `null`.
       *
       * For boolean columns, you can also set `value` to `true` or `false` and it
       * will behave the same way as `.eq()`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      is(column, value2) {
        this.url.searchParams.append(column, `is.${value2}`);
        return this;
      }
      /**
       * Match only rows where `column` is included in the `values` array.
       *
       * @param column - The column to filter on
       * @param values - The values array to filter with
       */
      in(column, values) {
        const cleanedValues = values.map((s3) => {
          if (typeof s3 === "string" && new RegExp("[,()]").test(s3))
            return `"${s3}"`;
          else
            return `${s3}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * `column` contains every element appearing in `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      contains(column, value2) {
        if (typeof value2 === "string") {
          this.url.searchParams.append(column, `cs.${value2}`);
        } else if (Array.isArray(value2)) {
          this.url.searchParams.append(column, `cs.{${value2.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cs.${JSON.stringify(value2)}`);
        }
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * every element appearing in `column` is contained by `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      containedBy(column, value2) {
        if (typeof value2 === "string") {
          this.url.searchParams.append(column, `cd.${value2}`);
        } else if (Array.isArray(value2)) {
          this.url.searchParams.append(column, `cd.{${value2.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cd.${JSON.stringify(value2)}`);
        }
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is greater than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or greater than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is less than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or less than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where `column` is
       * mutually exclusive to `range` and there can be no element between the two
       * ranges.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
      }
      /**
       * Only relevant for array and range columns. Match only rows where
       * `column` and `value` have an element in common.
       *
       * @param column - The array or range column to filter on
       * @param value - The array or range value to filter with
       */
      overlaps(column, value2) {
        if (typeof value2 === "string") {
          this.url.searchParams.append(column, `ov.${value2}`);
        } else {
          this.url.searchParams.append(column, `ov.{${value2.join(",")}}`);
        }
        return this;
      }
      /**
       * Only relevant for text and tsvector columns. Match only rows where
       * `column` matches the query string in `query`.
       *
       * @param column - The text or tsvector column to filter on
       * @param query - The query text to match with
       * @param options - Named parameters
       * @param options.config - The text search configuration to use
       * @param options.type - Change how the `query` text is interpreted
       */
      textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
          typePart = "pl";
        } else if (type === "phrase") {
          typePart = "ph";
        } else if (type === "websearch") {
          typePart = "w";
        }
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
      }
      /**
       * Match only rows where each column in `query` keys is equal to its
       * associated value. Shorthand for multiple `.eq()`s.
       *
       * @param query - The object to filter with, with column names as keys mapped
       * to their filter values
       */
      match(query) {
        Object.entries(query).forEach(([column, value2]) => {
          this.url.searchParams.append(column, `eq.${value2}`);
        });
        return this;
      }
      /**
       * Match only rows which doesn't satisfy the filter.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to be negated to filter with, following
       * PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      not(column, operator, value2) {
        this.url.searchParams.append(column, `not.${operator}.${value2}`);
        return this;
      }
      /**
       * Match only rows which satisfy at least one of the filters.
       *
       * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure it's properly sanitized.
       *
       * It's currently not possible to do an `.or()` filter across multiple tables.
       *
       * @param filters - The filters to use, following PostgREST syntax
       * @param foreignTable - Set this to filter on foreign tables instead of the
       * current table
       */
      or(filters, { foreignTable } = {}) {
        const key2 = foreignTable ? `${foreignTable}.or` : "or";
        this.url.searchParams.append(key2, `(${filters})`);
        return this;
      }
      /**
       * Match only rows which satisfy the filter. This is an escape hatch - you
       * should use the specific filter methods wherever possible.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to filter with, following PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      filter(column, operator, value2) {
        this.url.searchParams.append(column, `${operator}.${value2}`);
        return this;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js
var PostgrestQueryBuilder;
var init_PostgrestQueryBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js"() {
    init_PostgrestFilterBuilder();
    PostgrestQueryBuilder = class {
      constructor(url, { headers = {}, schema, fetch: fetch2 }) {
        this.url = url;
        this.headers = headers;
        this.schema = schema;
        this.fetch = fetch2;
      }
      /**
       * Perform a SELECT query on the table or view.
       *
       * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
       *
       * @param options - Named parameters
       *
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       *
       * @param options.count - Count algorithm to use to count rows in the table or view.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      select(columns, { head = false, count } = {}) {
        const method = head ? "HEAD" : "GET";
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c2) => {
          if (/\s/.test(c2) && !quoted2) {
            return "";
          }
          if (c2 === '"') {
            quoted2 = !quoted2;
          }
          return c2;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
          this.headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an INSERT into the table or view.
       *
       * By default, inserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to insert. Pass an object to insert a single row
       * or an array to insert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count inserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column.
       */
      insert(values, { count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
          prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x2) => acc.concat(Object.keys(x2)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an UPSERT on the table or view. Depending on the column(s) passed
       * to `onConflict`, `.upsert()` allows you to perform the equivalent of
       * `.insert()` if a row with the corresponding `onConflict` columns doesn't
       * exist, or if it does exist, perform an alternative action depending on
       * `ignoreDuplicates`.
       *
       * By default, upserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to upsert with. Pass an object to upsert a
       * single row or an array to upsert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
       * duplicate rows are determined. Two rows are duplicates if all the
       * `onConflict` columns are equal.
       *
       * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
       * `false`, duplicate rows are merged with existing rows.
       *
       * @param options.count - Count algorithm to use to count upserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. This only applies when
       * inserting new rows, not when merging with existing rows under
       * `ignoreDuplicates: false`.
       */
      upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [`resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`];
        if (onConflict !== void 0)
          this.url.searchParams.set("on_conflict", onConflict);
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
          prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x2) => acc.concat(Object.keys(x2)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an UPDATE on the table or view.
       *
       * By default, updated rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param values - The values to update with
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count updated rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      update(values, { count } = {}) {
        const method = "PATCH";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform a DELETE on the table or view.
       *
       * By default, deleted rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count deleted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      delete({ count } = {}) {
        const method = "DELETE";
        const prefersHeaders = [];
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
          prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/version.js
var version;
var init_version = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/version.js"() {
    version = "1.6.1";
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/constants.js
var DEFAULT_HEADERS;
var init_constants = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/constants.js"() {
    init_version();
    DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version}` };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
var PostgrestClient;
var init_PostgrestClient = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js"() {
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_constants();
    PostgrestClient = class {
      // TODO: Add back shouldThrowOnError once we figure out the typings
      /**
       * Creates a PostgREST client.
       *
       * @param url - URL of the PostgREST endpoint
       * @param options - Named parameters
       * @param options.headers - Custom headers
       * @param options.schema - Postgres schema to switch to
       * @param options.fetch - Custom fetch
       */
      constructor(url, { headers = {}, schema, fetch: fetch2 } = {}) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
        this.schema = schema;
        this.fetch = fetch2;
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder(url, {
          headers: Object.assign({}, this.headers),
          schema: this.schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, { head = false, count } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head) {
          method = "HEAD";
          Object.entries(args).forEach(([name, value2]) => {
            url.searchParams.append(name, `${value2}`);
          });
        } else {
          method = "POST";
          body = args;
        }
        const headers = Object.assign({}, this.headers);
        if (count) {
          headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url,
          headers,
          schema: this.schema,
          body,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/index.js
var init_module2 = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.6.1/node_modules/@supabase/postgrest-js/dist/module/index.js"() {
    init_PostgrestClient();
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_PostgrestTransformBuilder();
    init_PostgrestBuilder();
  }
});

// node_modules/.pnpm/es5-ext@0.10.62/node_modules/es5-ext/global.js
var require_global = __commonJS({
  "node_modules/.pnpm/es5-ext@0.10.62/node_modules/es5-ext/global.js"(exports, module) {
    var naiveFallback = function() {
      if (typeof self === "object" && self)
        return self;
      if (typeof window === "object" && window)
        return window;
      throw new Error("Unable to resolve global `this`");
    };
    module.exports = function() {
      if (this)
        return this;
      if (typeof globalThis === "object" && globalThis)
        return globalThis;
      try {
        Object.defineProperty(Object.prototype, "__global__", {
          get: function() {
            return this;
          },
          configurable: true
        });
      } catch (error2) {
        return naiveFallback();
      }
      try {
        if (!__global__)
          return naiveFallback();
        return __global__;
      } finally {
        delete Object.prototype.__global__;
      }
    }();
  }
});

// node_modules/.pnpm/websocket@1.0.34/node_modules/websocket/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/websocket@1.0.34/node_modules/websocket/package.json"(exports, module) {
    module.exports = {
      name: "websocket",
      description: "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
      keywords: [
        "websocket",
        "websockets",
        "socket",
        "networking",
        "comet",
        "push",
        "RFC-6455",
        "realtime",
        "server",
        "client"
      ],
      author: "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
      contributors: [
        "I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
      ],
      version: "1.0.34",
      repository: {
        type: "git",
        url: "https://github.com/theturtle32/WebSocket-Node.git"
      },
      homepage: "https://github.com/theturtle32/WebSocket-Node",
      engines: {
        node: ">=4.0.0"
      },
      dependencies: {
        bufferutil: "^4.0.1",
        debug: "^2.2.0",
        "es5-ext": "^0.10.50",
        "typedarray-to-buffer": "^3.1.5",
        "utf-8-validate": "^5.0.2",
        yaeti: "^0.0.6"
      },
      devDependencies: {
        "buffer-equal": "^1.0.0",
        gulp: "^4.0.2",
        "gulp-jshint": "^2.0.4",
        "jshint-stylish": "^2.2.1",
        jshint: "^2.0.0",
        tape: "^4.9.1"
      },
      config: {
        verbose: false
      },
      scripts: {
        test: "tape test/unit/*.js",
        gulp: "gulp"
      },
      main: "index",
      directories: {
        lib: "./lib"
      },
      browser: "lib/browser.js",
      license: "Apache-2.0"
    };
  }
});

// node_modules/.pnpm/websocket@1.0.34/node_modules/websocket/lib/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/websocket@1.0.34/node_modules/websocket/lib/version.js"(exports, module) {
    module.exports = require_package().version;
  }
});

// node_modules/.pnpm/websocket@1.0.34/node_modules/websocket/lib/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/websocket@1.0.34/node_modules/websocket/lib/browser.js"(exports, module) {
    var _globalThis;
    if (typeof globalThis === "object") {
      _globalThis = globalThis;
    } else {
      try {
        _globalThis = require_global();
      } catch (error2) {
      } finally {
        if (!_globalThis && typeof window !== "undefined") {
          _globalThis = window;
        }
        if (!_globalThis) {
          throw new Error("Could not determine global this");
        }
      }
    }
    var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
    var websocket_version = require_version();
    function W3CWebSocket(uri, protocols) {
      var native_instance;
      if (protocols) {
        native_instance = new NativeWebSocket(uri, protocols);
      } else {
        native_instance = new NativeWebSocket(uri);
      }
      return native_instance;
    }
    if (NativeWebSocket) {
      ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(prop) {
        Object.defineProperty(W3CWebSocket, prop, {
          get: function() {
            return NativeWebSocket[prop];
          }
        });
      });
    }
    module.exports = {
      "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
      "version": websocket_version
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/version.js
var version2;
var init_version2 = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/version.js"() {
    version2 = "2.7.2";
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_HEADERS2, VSN, DEFAULT_TIMEOUT, WS_CLOSE_NORMAL, SOCKET_STATES, CHANNEL_STATES, CHANNEL_EVENTS, TRANSPORTS, CONNECTION_STATE;
var init_constants2 = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/constants.js"() {
    init_version2();
    DEFAULT_HEADERS2 = { "X-Client-Info": `realtime-js/${version2}` };
    VSN = "1.0.0";
    DEFAULT_TIMEOUT = 1e4;
    WS_CLOSE_NORMAL = 1e3;
    (function(SOCKET_STATES2) {
      SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
      SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
      SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
      SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
    })(SOCKET_STATES || (SOCKET_STATES = {}));
    (function(CHANNEL_STATES2) {
      CHANNEL_STATES2["closed"] = "closed";
      CHANNEL_STATES2["errored"] = "errored";
      CHANNEL_STATES2["joined"] = "joined";
      CHANNEL_STATES2["joining"] = "joining";
      CHANNEL_STATES2["leaving"] = "leaving";
    })(CHANNEL_STATES || (CHANNEL_STATES = {}));
    (function(CHANNEL_EVENTS2) {
      CHANNEL_EVENTS2["close"] = "phx_close";
      CHANNEL_EVENTS2["error"] = "phx_error";
      CHANNEL_EVENTS2["join"] = "phx_join";
      CHANNEL_EVENTS2["reply"] = "phx_reply";
      CHANNEL_EVENTS2["leave"] = "phx_leave";
      CHANNEL_EVENTS2["access_token"] = "access_token";
    })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
    (function(TRANSPORTS2) {
      TRANSPORTS2["websocket"] = "websocket";
    })(TRANSPORTS || (TRANSPORTS = {}));
    (function(CONNECTION_STATE2) {
      CONNECTION_STATE2["Connecting"] = "connecting";
      CONNECTION_STATE2["Open"] = "open";
      CONNECTION_STATE2["Closing"] = "closing";
      CONNECTION_STATE2["Closed"] = "closed";
    })(CONNECTION_STATE || (CONNECTION_STATE = {}));
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/timer.js
var Timer;
var init_timer = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/timer.js"() {
    Timer = class {
      constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = void 0;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
      }
      reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      }
      // Cancels any previous scheduleTimeout and schedules callback
      scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.tries = this.tries + 1;
          this.callback();
        }, this.timerCalc(this.tries + 1));
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
var Serializer;
var init_serializer = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/serializer.js"() {
    Serializer = class {
      constructor() {
        this.HEADER_LENGTH = 1;
      }
      decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
          return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === "string") {
          return callback(JSON.parse(rawPayload));
        }
        return callback({});
      }
      _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder2 = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder2);
      }
      _decodeBroadcast(buffer, view, decoder2) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder2.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder2.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder2.decode(buffer.slice(offset, buffer.byteLength)));
        return { ref: null, topic, event, payload: data };
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/push.js
var Push;
var init_push = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/push.js"() {
    init_constants2();
    Push = class {
      /**
       * Initializes the Push
       *
       * @param channel The Channel
       * @param event The event, for example `"phx_join"`
       * @param payload The payload, for example `{user_id: 123}`
       * @param timeout The push timeout in milliseconds
       */
      constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = void 0;
        this.ref = "";
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
        this.rateLimited = false;
      }
      resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = "";
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
      }
      send() {
        if (this._hasReceived("timeout")) {
          return;
        }
        this.startTimeout();
        this.sent = true;
        const status = this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload,
          ref: this.ref,
          join_ref: this.channel._joinRef()
        });
        if (status === "rate limited") {
          this.rateLimited = true;
        }
      }
      updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
      }
      receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
          callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({ status, callback });
        return this;
      }
      startTimeout() {
        if (this.timeoutTimer) {
          return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload) => {
          this._cancelRefEvent();
          this._cancelTimeout();
          this.receivedResp = payload;
          this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout);
      }
      trigger(status, response) {
        if (this.refEvent)
          this.channel._trigger(this.refEvent, { status, response });
      }
      destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
      }
      _cancelRefEvent() {
        if (!this.refEvent) {
          return;
        }
        this.channel._off(this.refEvent, {});
      }
      _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = void 0;
      }
      _matchReceive({ status, response }) {
        this.recHooks.filter((h2) => h2.status === status).forEach((h2) => h2.callback(response));
      }
      _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
var REALTIME_PRESENCE_LISTEN_EVENTS, RealtimePresence;
var init_RealtimePresence = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"() {
    (function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
      REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
      REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
      REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
    })(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
    RealtimePresence = class {
      /**
       * Initializes the Presence.
       *
       * @param channel - The RealtimeChannel
       * @param opts - The options,
       *        for example `{events: {state: 'state', diff: 'diff'}}`
       */
      constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
          onJoin: () => {
          },
          onLeave: () => {
          },
          onSync: () => {
          }
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
          state: "presence_state",
          diff: "presence_diff"
        };
        this.channel._on(events.state, {}, (newState) => {
          const { onJoin, onLeave, onSync } = this.caller;
          this.joinRef = this.channel._joinRef();
          this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
          this.pendingDiffs.forEach((diff) => {
            this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
          });
          this.pendingDiffs = [];
          onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
          const { onJoin, onLeave, onSync } = this.caller;
          if (this.inPendingSyncState()) {
            this.pendingDiffs.push(diff);
          } else {
            this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            onSync();
          }
        });
        this.onJoin((key2, currentPresences, newPresences) => {
          this.channel._trigger("presence", {
            event: "join",
            key: key2,
            currentPresences,
            newPresences
          });
        });
        this.onLeave((key2, currentPresences, leftPresences) => {
          this.channel._trigger("presence", {
            event: "leave",
            key: key2,
            currentPresences,
            leftPresences
          });
        });
        this.onSync(() => {
          this.channel._trigger("presence", { event: "sync" });
        });
      }
      /**
       * Used to sync the list of presences on the server with the
       * client's state.
       *
       * An optional `onJoin` and `onLeave` callback can be provided to
       * react to changes in the client's local presences across
       * disconnects and reconnects with the server.
       *
       * @internal
       */
      static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key2, presences) => {
          if (!transformedState[key2]) {
            leaves[key2] = presences;
          }
        });
        this.map(transformedState, (key2, newPresences) => {
          const currentPresences = state[key2];
          if (currentPresences) {
            const newPresenceRefs = newPresences.map((m2) => m2.presence_ref);
            const curPresenceRefs = currentPresences.map((m2) => m2.presence_ref);
            const joinedPresences = newPresences.filter((m2) => curPresenceRefs.indexOf(m2.presence_ref) < 0);
            const leftPresences = currentPresences.filter((m2) => newPresenceRefs.indexOf(m2.presence_ref) < 0);
            if (joinedPresences.length > 0) {
              joins[key2] = joinedPresences;
            }
            if (leftPresences.length > 0) {
              leaves[key2] = leftPresences;
            }
          } else {
            joins[key2] = newPresences;
          }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
      }
      /**
       * Used to sync a diff of presence join and leave events from the
       * server, as they happen.
       *
       * Like `syncState`, `syncDiff` accepts optional `onJoin` and
       * `onLeave` callbacks to react to a user joining or leaving from a
       * device.
       *
       * @internal
       */
      static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
          joins: this.transformState(diff.joins),
          leaves: this.transformState(diff.leaves)
        };
        if (!onJoin) {
          onJoin = () => {
          };
        }
        if (!onLeave) {
          onLeave = () => {
          };
        }
        this.map(joins, (key2, newPresences) => {
          var _a;
          const currentPresences = (_a = state[key2]) !== null && _a !== void 0 ? _a : [];
          state[key2] = this.cloneDeep(newPresences);
          if (currentPresences.length > 0) {
            const joinedPresenceRefs = state[key2].map((m2) => m2.presence_ref);
            const curPresences = currentPresences.filter((m2) => joinedPresenceRefs.indexOf(m2.presence_ref) < 0);
            state[key2].unshift(...curPresences);
          }
          onJoin(key2, currentPresences, newPresences);
        });
        this.map(leaves, (key2, leftPresences) => {
          let currentPresences = state[key2];
          if (!currentPresences)
            return;
          const presenceRefsToRemove = leftPresences.map((m2) => m2.presence_ref);
          currentPresences = currentPresences.filter((m2) => presenceRefsToRemove.indexOf(m2.presence_ref) < 0);
          state[key2] = currentPresences;
          onLeave(key2, currentPresences, leftPresences);
          if (currentPresences.length === 0)
            delete state[key2];
        });
        return state;
      }
      /** @internal */
      static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key2) => func(key2, obj[key2]));
      }
      /**
       * Remove 'metas' key
       * Change 'phx_ref' to 'presence_ref'
       * Remove 'phx_ref' and 'phx_ref_prev'
       *
       * @example
       * // returns {
       *  abc123: [
       *    { presence_ref: '2', user_id: 1 },
       *    { presence_ref: '3', user_id: 2 }
       *  ]
       * }
       * RealtimePresence.transformState({
       *  abc123: {
       *    metas: [
       *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
       *      { phx_ref: '3', user_id: 2 }
       *    ]
       *  }
       * })
       *
       * @internal
       */
      static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key2) => {
          const presences = state[key2];
          if ("metas" in presences) {
            newState[key2] = presences.metas.map((presence) => {
              presence["presence_ref"] = presence["phx_ref"];
              delete presence["phx_ref"];
              delete presence["phx_ref_prev"];
              return presence;
            });
          } else {
            newState[key2] = presences;
          }
          return newState;
        }, {});
      }
      /** @internal */
      static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
      /** @internal */
      onJoin(callback) {
        this.caller.onJoin = callback;
      }
      /** @internal */
      onLeave(callback) {
        this.caller.onLeave = callback;
      }
      /** @internal */
      onSync(callback) {
        this.caller.onSync = callback;
      }
      /** @internal */
      inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
var PostgresTypes, convertChangeData, convertColumn, convertCell, noop2, toBoolean, toNumber, toJson, toArray, toTimestampString;
var init_transformers = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js"() {
    (function(PostgresTypes2) {
      PostgresTypes2["abstime"] = "abstime";
      PostgresTypes2["bool"] = "bool";
      PostgresTypes2["date"] = "date";
      PostgresTypes2["daterange"] = "daterange";
      PostgresTypes2["float4"] = "float4";
      PostgresTypes2["float8"] = "float8";
      PostgresTypes2["int2"] = "int2";
      PostgresTypes2["int4"] = "int4";
      PostgresTypes2["int4range"] = "int4range";
      PostgresTypes2["int8"] = "int8";
      PostgresTypes2["int8range"] = "int8range";
      PostgresTypes2["json"] = "json";
      PostgresTypes2["jsonb"] = "jsonb";
      PostgresTypes2["money"] = "money";
      PostgresTypes2["numeric"] = "numeric";
      PostgresTypes2["oid"] = "oid";
      PostgresTypes2["reltime"] = "reltime";
      PostgresTypes2["text"] = "text";
      PostgresTypes2["time"] = "time";
      PostgresTypes2["timestamp"] = "timestamp";
      PostgresTypes2["timestamptz"] = "timestamptz";
      PostgresTypes2["timetz"] = "timetz";
      PostgresTypes2["tsrange"] = "tsrange";
      PostgresTypes2["tstzrange"] = "tstzrange";
    })(PostgresTypes || (PostgresTypes = {}));
    convertChangeData = (columns, record, options2 = {}) => {
      var _a;
      const skipTypes = (_a = options2.skipTypes) !== null && _a !== void 0 ? _a : [];
      return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
      }, {});
    };
    convertColumn = (columnName, columns, record, skipTypes) => {
      const column = columns.find((x2) => x2.name === columnName);
      const colType = column === null || column === void 0 ? void 0 : column.type;
      const value2 = record[columnName];
      if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value2);
      }
      return noop2(value2);
    };
    convertCell = (type, value2) => {
      if (type.charAt(0) === "_") {
        const dataType = type.slice(1, type.length);
        return toArray(value2, dataType);
      }
      switch (type) {
        case PostgresTypes.bool:
          return toBoolean(value2);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
          return toNumber(value2);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
          return toJson(value2);
        case PostgresTypes.timestamp:
          return toTimestampString(value2);
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
          return noop2(value2);
        default:
          return noop2(value2);
      }
    };
    noop2 = (value2) => {
      return value2;
    };
    toBoolean = (value2) => {
      switch (value2) {
        case "t":
          return true;
        case "f":
          return false;
        default:
          return value2;
      }
    };
    toNumber = (value2) => {
      if (typeof value2 === "string") {
        const parsedValue = parseFloat(value2);
        if (!Number.isNaN(parsedValue)) {
          return parsedValue;
        }
      }
      return value2;
    };
    toJson = (value2) => {
      if (typeof value2 === "string") {
        try {
          return JSON.parse(value2);
        } catch (error2) {
          console.log(`JSON parse error: ${error2}`);
          return value2;
        }
      }
      return value2;
    };
    toArray = (value2, type) => {
      if (typeof value2 !== "string") {
        return value2;
      }
      const lastIdx = value2.length - 1;
      const closeBrace = value2[lastIdx];
      const openBrace = value2[0];
      if (openBrace === "{" && closeBrace === "}") {
        let arr;
        const valTrim = value2.slice(1, lastIdx);
        try {
          arr = JSON.parse("[" + valTrim + "]");
        } catch (_2) {
          arr = valTrim ? valTrim.split(",") : [];
        }
        return arr.map((val) => convertCell(type, val));
      }
      return value2;
    };
    toTimestampString = (value2) => {
      if (typeof value2 === "string") {
        return value2.replace(" ", "T");
      }
      return value2;
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var __awaiter3, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT, REALTIME_LISTEN_TYPES, REALTIME_SUBSCRIBE_STATES, RealtimeChannel;
var init_RealtimeChannel = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js"() {
    init_constants2();
    init_push();
    init_timer();
    init_RealtimePresence();
    init_transformers();
    __awaiter3 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
    })(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
    (function(REALTIME_LISTEN_TYPES2) {
      REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
      REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
      REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
    })(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
    (function(REALTIME_SUBSCRIBE_STATES2) {
      REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
      REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
      REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
      REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
    })(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
    RealtimeChannel = class {
      constructor(topic, params = { config: {} }, socket) {
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.params.config = Object.assign({
          broadcast: { ack: false, self: false },
          presence: { key: "" }
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", () => {
          this.state = CHANNEL_STATES.joined;
          this.rejoinTimer.reset();
          this.pushBuffer.forEach((pushEvent) => pushEvent.send());
          this.pushBuffer = [];
        });
        this._onClose(() => {
          this.rejoinTimer.reset();
          this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
          this.state = CHANNEL_STATES.closed;
          this.socket._remove(this);
        });
        this._onError((reason) => {
          if (this._isLeaving() || this._isClosed()) {
            return;
          }
          this.socket.log("channel", `error ${this.topic}`, reason);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", () => {
          if (!this._isJoining()) {
            return;
          }
          this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
          this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new RealtimePresence(this);
      }
      /** Subscribe registers your client with the server */
      subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (this.joinedOnce) {
          throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        } else {
          const { config: { broadcast, presence } } = this.params;
          this._onError((e2) => callback && callback("CHANNEL_ERROR", e2));
          this._onClose(() => callback && callback("CLOSED"));
          const accessTokenPayload = {};
          const config = {
            broadcast,
            presence,
            postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r2) => r2.filter)) !== null && _b !== void 0 ? _b : []
          };
          if (this.socket.accessToken) {
            accessTokenPayload.access_token = this.socket.accessToken;
          }
          this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
          this.joinedOnce = true;
          this._rejoin(timeout);
          this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters }) => {
            var _a2;
            this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
            if (serverPostgresFilters === void 0) {
              callback && callback("SUBSCRIBED");
              return;
            } else {
              const clientPostgresBindings = this.bindings.postgres_changes;
              const bindingsLen = (_a2 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a2 !== void 0 ? _a2 : 0;
              const newPostgresBindings = [];
              for (let i2 = 0; i2 < bindingsLen; i2++) {
                const clientPostgresBinding = clientPostgresBindings[i2];
                const { filter: { event, schema, table, filter } } = clientPostgresBinding;
                const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i2];
                if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                  newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                } else {
                  this.unsubscribe();
                  callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                  return;
                }
              }
              this.bindings.postgres_changes = newPostgresBindings;
              callback && callback("SUBSCRIBED");
              return;
            }
          }).receive("error", (error2) => {
            callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error2).join(", ") || "error")));
            return;
          }).receive("timeout", () => {
            callback && callback("TIMED_OUT");
            return;
          });
        }
        return this;
      }
      presenceState() {
        return this.presence.state;
      }
      track(payload, opts = {}) {
        return __awaiter3(this, void 0, void 0, function* () {
          return yield this.send({
            type: "presence",
            event: "track",
            payload
          }, opts.timeout || this.timeout);
        });
      }
      untrack(opts = {}) {
        return __awaiter3(this, void 0, void 0, function* () {
          return yield this.send({
            type: "presence",
            event: "untrack"
          }, opts);
        });
      }
      on(type, filter, callback) {
        return this._on(type, filter, callback);
      }
      send(payload, opts = {}) {
        return new Promise((resolve) => {
          var _a, _b, _c;
          const push = this._push(payload.type, payload, opts.timeout || this.timeout);
          if (push.rateLimited) {
            resolve("rate limited");
          }
          if (payload.type === "broadcast" && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
            resolve("ok");
          }
          push.receive("ok", () => resolve("ok"));
          push.receive("timeout", () => resolve("timed out"));
        });
      }
      updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
      }
      /**
       * Leaves the channel.
       *
       * Unsubscribes from server events, and instructs channel to terminate on server.
       * Triggers onClose() hooks.
       *
       * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
       * channel.unsubscribe().receive("ok", () => alert("left!") )
       */
      unsubscribe(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;
        const onClose = () => {
          this.socket.log("channel", `leave ${this.topic}`);
          this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
        };
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        return new Promise((resolve) => {
          const leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
          leavePush.receive("ok", () => {
            onClose();
            resolve("ok");
          }).receive("timeout", () => {
            onClose();
            resolve("timed out");
          }).receive("error", () => {
            resolve("error");
          });
          leavePush.send();
          if (!this._canPush()) {
            leavePush.trigger("ok", {});
          }
        });
      }
      /** @internal */
      _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
          throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new Push(this, event, payload, timeout);
        if (this._canPush()) {
          pushEvent.send();
        } else {
          pushEvent.startTimeout();
          this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
      }
      /**
       * Overridable message hook
       *
       * Receives all events for specialized message handling before dispatching to the channel callbacks.
       * Must return the payload, modified or unmodified.
       *
       * @internal
       */
      _onMessage(_event, payload, _ref) {
        return payload;
      }
      /** @internal */
      _isMember(topic) {
        return this.topic === topic;
      }
      /** @internal */
      _joinRef() {
        return this.joinPush.ref;
      }
      /** @internal */
      _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error: error2, leave, join } = CHANNEL_EVENTS;
        const events = [close, error2, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
          return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
          throw "channel onMessage callbacks must return the payload, modified or unmodified";
        }
        if (["insert", "update", "delete"].includes(typeLower)) {
          (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
            var _a2, _b2, _c;
            return ((_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
          }).map((bind) => bind.callback(handledPayload, ref));
        } else {
          (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
            var _a2, _b2, _c, _d, _e, _f;
            if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
              if ("id" in bind) {
                const bindId = bind.id;
                const bindEvent = (_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event;
                return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
              } else {
                const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
              }
            } else {
              return bind.type.toLocaleLowerCase() === typeLower;
            }
          }).map((bind) => {
            if (typeof handledPayload === "object" && "ids" in handledPayload) {
              const postgresChanges = handledPayload.data;
              const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
              const enrichedPayload = {
                schema,
                table,
                commit_timestamp,
                eventType: type2,
                new: {},
                old: {},
                errors
              };
              handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
            }
            bind.callback(handledPayload, ref);
          });
        }
      }
      /** @internal */
      _isClosed() {
        return this.state === CHANNEL_STATES.closed;
      }
      /** @internal */
      _isJoined() {
        return this.state === CHANNEL_STATES.joined;
      }
      /** @internal */
      _isJoining() {
        return this.state === CHANNEL_STATES.joining;
      }
      /** @internal */
      _isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
      }
      /** @internal */
      _replyEventName(ref) {
        return `chan_reply_${ref}`;
      }
      /** @internal */
      _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
          type: typeLower,
          filter,
          callback
        };
        if (this.bindings[typeLower]) {
          this.bindings[typeLower].push(binding);
        } else {
          this.bindings[typeLower] = [binding];
        }
        return this;
      }
      /** @internal */
      _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
          var _a;
          return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
      }
      /** @internal */
      static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
          return false;
        }
        for (const k2 in obj1) {
          if (obj1[k2] !== obj2[k2]) {
            return false;
          }
        }
        return true;
      }
      /** @internal */
      _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
          this._rejoin();
        }
      }
      /**
       * Registers a callback that will be executed when the channel closes.
       *
       * @internal
       */
      _onClose(callback) {
        this._on(CHANNEL_EVENTS.close, {}, callback);
      }
      /**
       * Registers a callback that will be executed when the channel encounteres an error.
       *
       * @internal
       */
      _onError(callback) {
        this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
      }
      /**
       * Returns `true` if the socket is connected and the channel has been joined.
       *
       * @internal
       */
      _canPush() {
        return this.socket.isConnected() && this._isJoined();
      }
      /** @internal */
      _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
          return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
      }
      /** @internal */
      _getPayloadRecords(payload) {
        const records = {
          new: {},
          old: {}
        };
        if (payload.type === "INSERT" || payload.type === "UPDATE") {
          records.new = convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === "UPDATE" || payload.type === "DELETE") {
          records.old = convertChangeData(payload.columns, payload.old_record);
        }
        return records;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var import_websocket, __awaiter4, noop3, RealtimeClient;
var init_RealtimeClient = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js"() {
    import_websocket = __toESM(require_browser());
    init_constants2();
    init_timer();
    init_serializer();
    init_RealtimeChannel();
    __awaiter4 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    noop3 = () => {
    };
    RealtimeClient = class {
      /**
       * Initializes the Socket.
       *
       * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
       * @param options.transport The Websocket Transport, for example WebSocket.
       * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
       * @param options.params The optional params to pass when connecting.
       * @param options.headers The optional headers to pass when connecting.
       * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
       * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
       * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
       * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
       * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
       */
      constructor(endPoint, options2) {
        var _a;
        this.accessToken = null;
        this.channels = [];
        this.endPoint = "";
        this.headers = DEFAULT_HEADERS2;
        this.params = {};
        this.timeout = DEFAULT_TIMEOUT;
        this.transport = import_websocket.w3cwebsocket;
        this.heartbeatIntervalMs = 3e4;
        this.heartbeatTimer = void 0;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop3;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new Serializer();
        this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: []
        };
        this.eventsPerSecondLimitMs = 100;
        this.inThrottle = false;
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        if (options2 === null || options2 === void 0 ? void 0 : options2.params)
          this.params = options2.params;
        if (options2 === null || options2 === void 0 ? void 0 : options2.headers)
          this.headers = Object.assign(Object.assign({}, this.headers), options2.headers);
        if (options2 === null || options2 === void 0 ? void 0 : options2.timeout)
          this.timeout = options2.timeout;
        if (options2 === null || options2 === void 0 ? void 0 : options2.logger)
          this.logger = options2.logger;
        if (options2 === null || options2 === void 0 ? void 0 : options2.transport)
          this.transport = options2.transport;
        if (options2 === null || options2 === void 0 ? void 0 : options2.heartbeatIntervalMs)
          this.heartbeatIntervalMs = options2.heartbeatIntervalMs;
        const eventsPerSecond = (_a = options2 === null || options2 === void 0 ? void 0 : options2.params) === null || _a === void 0 ? void 0 : _a.eventsPerSecond;
        if (eventsPerSecond)
          this.eventsPerSecondLimitMs = Math.floor(1e3 / eventsPerSecond);
        this.reconnectAfterMs = (options2 === null || options2 === void 0 ? void 0 : options2.reconnectAfterMs) ? options2.reconnectAfterMs : (tries) => {
          return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
        };
        this.encode = (options2 === null || options2 === void 0 ? void 0 : options2.encode) ? options2.encode : (payload, callback) => {
          return callback(JSON.stringify(payload));
        };
        this.decode = (options2 === null || options2 === void 0 ? void 0 : options2.decode) ? options2.decode : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new Timer(() => __awaiter4(this, void 0, void 0, function* () {
          this.disconnect();
          this.connect();
        }), this.reconnectAfterMs);
      }
      /**
       * Connects the socket, unless already connected.
       */
      connect() {
        if (this.conn) {
          return;
        }
        this.conn = new this.transport(this._endPointURL(), [], null, this.headers);
        if (this.conn) {
          this.conn.binaryType = "arraybuffer";
          this.conn.onopen = () => this._onConnOpen();
          this.conn.onerror = (error2) => this._onConnError(error2);
          this.conn.onmessage = (event) => this._onConnMessage(event);
          this.conn.onclose = (event) => this._onConnClose(event);
        }
      }
      /**
       * Disconnects the socket.
       *
       * @param code A numeric status code to send on disconnect.
       * @param reason A custom reason for the disconnect.
       */
      disconnect(code, reason) {
        if (this.conn) {
          this.conn.onclose = function() {
          };
          if (code) {
            this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
          } else {
            this.conn.close();
          }
          this.conn = null;
          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.reconnectTimer.reset();
        }
      }
      /**
       * Returns all created channels
       */
      getChannels() {
        return this.channels;
      }
      /**
       * Unsubscribes and removes a single channel
       * @param channel A RealtimeChannel instance
       */
      removeChannel(channel) {
        return __awaiter4(this, void 0, void 0, function* () {
          const status = yield channel.unsubscribe();
          if (this.channels.length === 0) {
            this.disconnect();
          }
          return status;
        });
      }
      /**
       * Unsubscribes and removes all channels
       */
      removeAllChannels() {
        return __awaiter4(this, void 0, void 0, function* () {
          const values_1 = yield Promise.all(this.channels.map((channel) => channel.unsubscribe()));
          this.disconnect();
          return values_1;
        });
      }
      /**
       * Logs the message.
       *
       * For customized logging, `this.logger` can be overridden.
       */
      log(kind, msg, data) {
        this.logger(kind, msg, data);
      }
      /**
       * Returns the current state of the socket.
       */
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return CONNECTION_STATE.Connecting;
          case SOCKET_STATES.open:
            return CONNECTION_STATE.Open;
          case SOCKET_STATES.closing:
            return CONNECTION_STATE.Closing;
          default:
            return CONNECTION_STATE.Closed;
        }
      }
      /**
       * Returns `true` is the connection is open.
       */
      isConnected() {
        return this.connectionState() === CONNECTION_STATE.Open;
      }
      channel(topic, params = { config: {} }) {
        if (!this.isConnected()) {
          this.connect();
        }
        const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
      }
      /**
       * Push out a message if the socket is connected.
       *
       * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
       */
      push(data) {
        const { topic, event, payload, ref } = data;
        let callback = () => {
          this.encode(data, (result) => {
            var _a;
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
          });
        };
        this.log("push", `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
          if (["broadcast", "presence", "postgres_changes"].includes(event)) {
            const isThrottled = this._throttle(callback)();
            if (isThrottled) {
              return "rate limited";
            }
          } else {
            callback();
          }
        } else {
          this.sendBuffer.push(callback);
        }
      }
      /**
       * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
       *
       * @param token A JWT string.
       */
      setAuth(token) {
        this.accessToken = token;
        this.channels.forEach((channel) => {
          token && channel.updateJoinPayload({ access_token: token });
          if (channel.joinedOnce && channel._isJoined()) {
            channel._push(CHANNEL_EVENTS.access_token, { access_token: token });
          }
        });
      }
      /**
       * Return the next message ref, accounting for overflows
       *
       * @internal
       */
      _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }
        return this.ref.toString();
      }
      /**
       * Unsubscribe from channels with the specified topic.
       *
       * @internal
       */
      _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c2) => c2.topic === topic && (c2._isJoined() || c2._isJoining()));
        if (dupChannel) {
          this.log("transport", `leaving duplicate topic "${topic}"`);
          dupChannel.unsubscribe();
        }
      }
      /**
       * Removes a subscription from the socket.
       *
       * @param channel An open subscription.
       *
       * @internal
       */
      _remove(channel) {
        this.channels = this.channels.filter((c2) => c2._joinRef() !== channel._joinRef());
      }
      /**
       * Returns the URL of the websocket.
       *
       * @internal
       */
      _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
      }
      /** @internal */
      _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
          let { topic, event, payload, ref } = msg;
          if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
            this.pendingHeartbeatRef = null;
          }
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
          this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
          this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
        });
      }
      /** @internal */
      _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
        this.stateChangeCallbacks.open.forEach((callback) => callback());
      }
      /** @internal */
      _onConnClose(event) {
        this.log("transport", "close", event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback) => callback(event));
      }
      /** @internal */
      _onConnError(error2) {
        this.log("transport", error2.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback) => callback(error2));
      }
      /** @internal */
      _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
      }
      /** @internal */
      _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }
        const prefix2 = url.match(/\?/) ? "&" : "?";
        const query = new URLSearchParams(params);
        return `${url}${prefix2}${query}`;
      }
      /** @internal */
      _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach((callback) => callback());
          this.sendBuffer = [];
        }
      }
      /** @internal */
      _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
          return;
        }
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
          return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
        this.setAuth(this.accessToken);
      }
      /** @internal */
      _throttle(callback, eventsPerSecondLimitMs = this.eventsPerSecondLimitMs) {
        return () => {
          if (this.inThrottle)
            return true;
          callback();
          if (eventsPerSecondLimitMs > 0) {
            this.inThrottle = true;
            setTimeout(() => {
              this.inThrottle = false;
            }, eventsPerSecondLimitMs);
          }
          return false;
        };
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/index.js
var init_module3 = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.7.2/node_modules/@supabase/realtime-js/dist/module/index.js"() {
    init_RealtimeClient();
    init_RealtimeChannel();
    init_RealtimePresence();
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/errors.js
function isStorageError(error2) {
  return typeof error2 === "object" && error2 !== null && "__isStorageError" in error2;
}
var StorageError, StorageApiError, StorageUnknownError;
var init_errors = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/errors.js"() {
    StorageError = class extends Error {
      constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = "StorageError";
      }
    };
    StorageApiError = class extends StorageError {
      constructor(message, status) {
        super(message);
        this.name = "StorageApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    StorageUnknownError = class extends StorageError {
      constructor(message, originalError) {
        super(message);
        this.name = "StorageUnknownError";
        this.originalError = originalError;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/helpers.js
var __awaiter5, resolveFetch2, resolveResponse;
var init_helpers = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/helpers.js"() {
    __awaiter5 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch2 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => __awaiter5(void 0, void 0, void 0, function* () {
          return yield (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).fetch(...args);
        });
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveResponse = () => __awaiter5(void 0, void 0, void 0, function* () {
      if (typeof Response === "undefined") {
        return (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).Response;
      }
      return Response;
    });
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/fetch.js
function _handleRequest(fetcher, method, url, options2, parameters, body) {
  return __awaiter6(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options2, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve(data)).catch((error2) => handleError(error2, reject));
    });
  });
}
function get(fetcher, url, options2, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options2, parameters);
  });
}
function post(fetcher, url, body, options2, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options2, parameters, body);
  });
}
function put(fetcher, url, body, options2, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options2, parameters, body);
  });
}
function remove(fetcher, url, body, options2, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options2, parameters, body);
  });
}
var __awaiter6, _getErrorMessage, handleError, _getRequestParams;
var init_fetch = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/fetch.js"() {
    init_errors();
    init_helpers();
    __awaiter6 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    handleError = (error2, reject) => __awaiter6(void 0, void 0, void 0, function* () {
      const Res = yield resolveResponse();
      if (error2 instanceof Res) {
        error2.json().then((err) => {
          reject(new StorageApiError(_getErrorMessage(err), error2.status || 500));
        }).catch((err) => {
          reject(new StorageUnknownError(_getErrorMessage(err), err));
        });
      } else {
        reject(new StorageUnknownError(_getErrorMessage(error2), error2));
      }
    });
    _getRequestParams = (method, options2, parameters, body) => {
      const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
      params.body = JSON.stringify(body);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var __awaiter7, DEFAULT_SEARCH_OPTIONS, DEFAULT_FILE_OPTIONS, StorageFileApi;
var init_StorageFileApi = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js"() {
    init_errors();
    init_fetch();
    init_helpers();
    __awaiter7 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DEFAULT_SEARCH_OPTIONS = {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "name",
        order: "asc"
      }
    };
    DEFAULT_FILE_OPTIONS = {
      cacheControl: "3600",
      contentType: "text/plain;charset=UTF-8",
      upsert: false
    };
    StorageFileApi = class {
      constructor(url, headers = {}, bucketId, fetch2) {
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = resolveFetch2(fetch2);
      }
      /**
       * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
       *
       * @param method HTTP method.
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            let body;
            const options2 = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
            const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options2.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body = new FormData();
              body.append("cacheControl", options2.cacheControl);
              body.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body = fileBody;
              body.append("cacheControl", options2.cacheControl);
            } else {
              body = fileBody;
              headers["cache-control"] = `max-age=${options2.cacheControl}`;
              headers["content-type"] = options2.contentType;
            }
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({ method, body, headers }, (options2 === null || options2 === void 0 ? void 0 : options2.duplex) ? { duplex: options2.duplex } : {}));
            if (res.ok) {
              return {
                data: { path: cleanPath },
                error: null
              };
            } else {
              const error2 = yield res.json();
              return { data: null, error: error2 };
            }
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Uploads a file to an existing bucket.
       *
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      upload(path, fileBody, fileOptions) {
        return __awaiter7(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
        });
      }
      /**
       * Upload a file with a token generated from `createSignedUploadUrl`.
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param token The token generated from `createSignedUploadUrl`
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return __awaiter7(this, void 0, void 0, function* () {
          const cleanPath = this._removeEmptyFolders(path);
          const _path = this._getFinalPath(cleanPath);
          const url = new URL(this.url + `/object/upload/sign/${_path}`);
          url.searchParams.set("token", token);
          try {
            let body;
            const options2 = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
            const headers = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(options2.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body = new FormData();
              body.append("cacheControl", options2.cacheControl);
              body.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body = fileBody;
              body.append("cacheControl", options2.cacheControl);
            } else {
              body = fileBody;
              headers["cache-control"] = `max-age=${options2.cacheControl}`;
              headers["content-type"] = options2.contentType;
            }
            const res = yield this.fetch(url.toString(), {
              method: "PUT",
              body,
              headers
            });
            if (res.ok) {
              return {
                data: { path: cleanPath },
                error: null
              };
            } else {
              const error2 = yield res.json();
              return { data: null, error: error2 };
            }
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates a signed upload URL.
       * Signed upload URLs can be used to upload files to the bucket without further authentication.
       * They are valid for one minute.
       * @param path The file path, including the current file name. For example `folder/image.png`.
       */
      createSignedUploadUrl(path) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            const data = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers: this.headers });
            const url = new URL(this.url + data.url);
            const token = url.searchParams.get("token");
            if (!token) {
              throw new StorageError("No token returned by API");
            }
            return { data: { signedUrl: url.toString(), path, token }, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Replaces an existing file at the specified path with a new one.
       *
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      update(path, fileBody, fileOptions) {
        return __awaiter7(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
        });
      }
      /**
       * Moves an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
       */
      move(fromPath, toPath) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Copies an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
       */
      copy(fromPath, toPath) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data: { path: data.Key }, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param path The file path, including the current file name. For example `folder/image.png`.
       * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      createSignedUrl(path, expiresIn, options2) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options2 === null || options2 === void 0 ? void 0 : options2.transform) ? { transform: options2.transform } : {}), { headers: this.headers });
            const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `&download=${options2.download === true ? "" : options2.download}` : "";
            const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
            data = { signedUrl };
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
       * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       */
      createSignedUrls(paths, expiresIn, options2) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
            const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `&download=${options2.download === true ? "" : options2.download}` : "";
            return {
              data: data.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
              error: null
            };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
       *
       * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
       * @param options.transform Transform the asset before serving it to the client.
       */
      download(path, options2) {
        return __awaiter7(this, void 0, void 0, function* () {
          const wantsTransformation = typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !== "undefined";
          const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
          const transformationQuery = this.transformOptsToQueryString((options2 === null || options2 === void 0 ? void 0 : options2.transform) || {});
          const queryString = transformationQuery ? `?${transformationQuery}` : "";
          try {
            const _path = this._getFinalPath(path);
            const res = yield get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
              headers: this.headers,
              noResolveJson: true
            });
            const data = yield res.blob();
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
       * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
       *
       * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
       * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      getPublicUrl(path, options2) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `download=${options2.download === true ? "" : options2.download}` : "";
        if (downloadQueryParam !== "") {
          _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image" : "object";
        const transformationQuery = this.transformOptsToQueryString((options2 === null || options2 === void 0 ? void 0 : options2.transform) || {});
        if (transformationQuery !== "") {
          _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join("&");
        if (queryString !== "") {
          queryString = `?${queryString}`;
        }
        return {
          data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
        };
      }
      /**
       * Deletes files within the same bucket
       *
       * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
       */
      remove(paths) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Get file metadata
       * @param id the file id to retrieve metadata
       */
      // async getMetadata(
      //   id: string
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Update file metadata
       * @param id the file id to update metadata
       * @param meta the new file metadata
       */
      // async updateMetadata(
      //   id: string,
      //   meta: Metadata
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await post(
      //       this.fetch,
      //       `${this.url}/metadata/${id}`,
      //       { ...meta },
      //       { headers: this.headers }
      //     )
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Lists all the files within a bucket.
       * @param path The folder path.
       */
      list(path, options2, parameters) {
        return __awaiter7(this, void 0, void 0, function* () {
          try {
            const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options2), { prefix: path || "" });
            const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
      }
      _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
      }
      transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
          params.push(`width=${transform.width}`);
        }
        if (transform.height) {
          params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
          params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
          params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
          params.push(`quality=${transform.quality}`);
        }
        return params.join("&");
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/version.js
var version3;
var init_version3 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/version.js"() {
    version3 = "2.5.1";
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS3;
var init_constants3 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/constants.js"() {
    init_version3();
    DEFAULT_HEADERS3 = { "X-Client-Info": `storage-js/${version3}` };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var __awaiter8, StorageBucketApi;
var init_StorageBucketApi = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js"() {
    init_constants3();
    init_errors();
    init_fetch();
    init_helpers();
    __awaiter8 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    StorageBucketApi = class {
      constructor(url, headers = {}, fetch2) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS3), headers);
        this.fetch = resolveFetch2(fetch2);
      }
      /**
       * Retrieves the details of all Storage buckets within an existing project.
       */
      listBuckets() {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Retrieves the details of an existing Storage bucket.
       *
       * @param id The unique identifier of the bucket you would like to retrieve.
       */
      getBucket(id) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates a new Storage bucket
       *
       * @param id A unique identifier for the bucket you are creating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       * @returns newly created bucket id
       */
      createBucket(id, options2 = {
        public: false
      }) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket`, {
              id,
              name: id,
              public: options2.public,
              file_size_limit: options2.fileSizeLimit,
              allowed_mime_types: options2.allowedMimeTypes
            }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Updates a Storage bucket
       *
       * @param id A unique identifier for the bucket you are updating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       */
      updateBucket(id, options2) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield put(this.fetch, `${this.url}/bucket/${id}`, {
              id,
              name: id,
              public: options2.public,
              file_size_limit: options2.fileSizeLimit,
              allowed_mime_types: options2.allowedMimeTypes
            }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Removes all objects inside a single bucket.
       *
       * @param id The unique identifier of the bucket you would like to empty.
       */
      emptyBucket(id) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
       * You must first `empty()` the bucket.
       *
       * @param id The unique identifier of the bucket you would like to delete.
       */
      deleteBucket(id) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/StorageClient.js
var StorageClient;
var init_StorageClient = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/StorageClient.js"() {
    init_StorageFileApi();
    init_StorageBucketApi();
    StorageClient = class extends StorageBucketApi {
      constructor(url, headers = {}, fetch2) {
        super(url, headers, fetch2);
      }
      /**
       * Perform file operation in a bucket.
       *
       * @param id The bucket id to operate on.
       */
      from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/types.js
var init_types2 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/lib/types.js"() {
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/index.js
var init_module4 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.1/node_modules/@supabase/storage-js/dist/module/index.js"() {
    init_StorageClient();
    init_types2();
    init_errors();
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/version.js
var version4;
var init_version4 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/version.js"() {
    version4 = "2.22.0";
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var DEFAULT_HEADERS4;
var init_constants4 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/constants.js"() {
    init_version4();
    DEFAULT_HEADERS4 = { "X-Client-Info": `supabase-js/${version4}` };
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
var import_cross_fetch2, __awaiter9, resolveFetch3, resolveHeadersConstructor, fetchWithAuth;
var init_fetch2 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/fetch.js"() {
    import_cross_fetch2 = __toESM(require_browser_ponyfill());
    __awaiter9 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch3 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = import_cross_fetch2.default;
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveHeadersConstructor = () => {
      if (typeof Headers === "undefined") {
        return import_cross_fetch2.Headers;
      }
      return Headers;
    };
    fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
      const fetch2 = resolveFetch3(customFetch);
      const HeadersConstructor = resolveHeadersConstructor();
      return (input, init2) => __awaiter9(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
        let headers = new HeadersConstructor(init2 === null || init2 === void 0 ? void 0 : init2.headers);
        if (!headers.has("apikey")) {
          headers.set("apikey", supabaseKey);
        }
        if (!headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return fetch2(input, Object.assign(Object.assign({}, init2), { headers }));
      });
    };
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}
function applySettingDefaults(options2, defaults) {
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options2;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
  return {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions)
  };
}
var init_helpers2 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/helpers.js"() {
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c2) {
    const r2 = Math.random() * 16 | 0, v2 = c2 == "x" ? r2 : r2 & 3 | 8;
    return v2.toString(16);
  });
}
function getParameterByName(name, url) {
  var _a;
  if (!url)
    url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || "";
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function decodeBase64URL(value2) {
  const key2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let base642 = "";
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i2 = 0;
  value2 = value2.replace("-", "+").replace("_", "/");
  while (i2 < value2.length) {
    enc1 = key2.indexOf(value2.charAt(i2++));
    enc2 = key2.indexOf(value2.charAt(i2++));
    enc3 = key2.indexOf(value2.charAt(i2++));
    enc4 = key2.indexOf(value2.charAt(i2++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    base642 = base642 + String.fromCharCode(chr1);
    if (enc3 != 64 && chr2 != 0) {
      base642 = base642 + String.fromCharCode(chr2);
    }
    if (enc4 != 64 && chr3 != 0) {
      base642 = base642 + String.fromCharCode(chr3);
    }
  }
  return base642;
}
function decodeJWTPayload(token) {
  const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT is not valid: not a JWT structure");
  }
  if (!base64UrlRegex.test(parts[1])) {
    throw new Error("JWT is not valid: payload is not in base64url format");
  }
  const base64Url = parts[1];
  return JSON.parse(decodeBase64URL(base64Url));
}
function sleep(time) {
  return new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    ;
    (() => __awaiter10(this, void 0, void 0, function* () {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = yield fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e2) {
          if (!isRetryable(attempt, e2)) {
            reject(e2);
            return;
          }
        }
      }
    }))();
  });
  return promise;
}
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array2 = new Uint32Array(verifierLength);
  if (typeof crypto === "undefined") {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const charSetLen = charSet.length;
    let verifier = "";
    for (let i2 = 0; i2 < verifierLength; i2++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array2);
  return Array.from(array2, dec2hex).join("");
}
function sha256(randomString) {
  return __awaiter10(this, void 0, void 0, function* () {
    const encoder4 = new TextEncoder();
    const encodedData = encoder4.encode(randomString);
    const hash2 = yield crypto.subtle.digest("SHA-256", encodedData);
    const bytes = new Uint8Array(hash2);
    return Array.from(bytes).map((c2) => String.fromCharCode(c2)).join("");
  });
}
function base64urlencode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function generatePKCEChallenge(verifier) {
  return __awaiter10(this, void 0, void 0, function* () {
    if (typeof crypto === "undefined") {
      console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
      return verifier;
    }
    const hashed = yield sha256(verifier);
    return base64urlencode(hashed);
  });
}
var __awaiter10, isBrowser, localStorageWriteTests, supportsLocalStorage, resolveFetch4, looksLikeFetchResponse, setItemAsync, getItemAsync, removeItemAsync, Deferred;
var init_helpers3 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js"() {
    __awaiter10 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    isBrowser = () => typeof document !== "undefined";
    localStorageWriteTests = {
      tested: false,
      writable: false
    };
    supportsLocalStorage = () => {
      if (!isBrowser()) {
        return false;
      }
      try {
        if (typeof globalThis.localStorage !== "object") {
          return false;
        }
      } catch (e2) {
        return false;
      }
      if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
      }
      const randomKey = `lswt-${Math.random()}${Math.random()}`;
      try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
      } catch (e2) {
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
      }
      return localStorageWriteTests.writable;
    };
    resolveFetch4 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => __awaiter10(void 0, void 0, void 0, function* () {
          return yield (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).fetch(...args);
        });
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    looksLikeFetchResponse = (maybeResponse) => {
      return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
    };
    setItemAsync = (storage, key2, data) => __awaiter10(void 0, void 0, void 0, function* () {
      yield storage.setItem(key2, JSON.stringify(data));
    });
    getItemAsync = (storage, key2) => __awaiter10(void 0, void 0, void 0, function* () {
      const value2 = yield storage.getItem(key2);
      if (!value2) {
        return null;
      }
      try {
        return JSON.parse(value2);
      } catch (_a) {
        return value2;
      }
    });
    removeItemAsync = (storage, key2) => __awaiter10(void 0, void 0, void 0, function* () {
      yield storage.removeItem(key2);
    });
    Deferred = class {
      constructor() {
        ;
        this.promise = new Deferred.promiseConstructor((res, rej) => {
          ;
          this.resolve = res;
          this.reject = rej;
        });
      }
    };
    Deferred.promiseConstructor = Promise;
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/errors.js
function isAuthError(error2) {
  return typeof error2 === "object" && error2 !== null && "__isAuthError" in error2;
}
function isAuthApiError(error2) {
  return isAuthError(error2) && error2.name === "AuthApiError";
}
var AuthError, AuthApiError, AuthUnknownError, CustomAuthError, AuthSessionMissingError, AuthInvalidCredentialsError, AuthImplicitGrantRedirectError, AuthPKCEGrantCodeExchangeError, AuthRetryableFetchError;
var init_errors2 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/errors.js"() {
    AuthError = class extends Error {
      constructor(message, status) {
        super(message);
        this.__isAuthError = true;
        this.name = "AuthError";
        this.status = status;
      }
    };
    AuthApiError = class extends AuthError {
      constructor(message, status) {
        super(message, status);
        this.name = "AuthApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthUnknownError = class extends AuthError {
      constructor(message, originalError) {
        super(message);
        this.name = "AuthUnknownError";
        this.originalError = originalError;
      }
    };
    CustomAuthError = class extends AuthError {
      constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthSessionMissingError = class extends CustomAuthError {
      constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400);
      }
    };
    AuthInvalidCredentialsError = class extends CustomAuthError {
      constructor(message) {
        super(message, "AuthInvalidCredentialsError", 400);
      }
    };
    AuthImplicitGrantRedirectError = class extends CustomAuthError {
      constructor(message, details = null) {
        super(message, "AuthImplicitGrantRedirectError", 500);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
      constructor(message, details = null) {
        super(message, "AuthPKCEGrantCodeExchangeError", 500);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthRetryableFetchError = class extends CustomAuthError {
      constructor(message, status) {
        super(message, "AuthRetryableFetchError", status);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
function _request(fetcher, method, url, options2) {
  var _a;
  return __awaiter11(this, void 0, void 0, function* () {
    const headers = Object.assign({}, options2 === null || options2 === void 0 ? void 0 : options2.headers);
    if (options2 === null || options2 === void 0 ? void 0 : options2.jwt) {
      headers["Authorization"] = `Bearer ${options2.jwt}`;
    }
    const qs = (_a = options2 === null || options2 === void 0 ? void 0 : options2.query) !== null && _a !== void 0 ? _a : {};
    if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
      qs["redirect_to"] = options2.redirectTo;
    }
    const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
    const data = yield _handleRequest2(fetcher, method, url + queryString, { headers, noResolveJson: options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson }, {}, options2 === null || options2 === void 0 ? void 0 : options2.body);
    return (options2 === null || options2 === void 0 ? void 0 : options2.xform) ? options2 === null || options2 === void 0 ? void 0 : options2.xform(data) : { data: Object.assign({}, data), error: null };
  });
}
function _handleRequest2(fetcher, method, url, options2, parameters, body) {
  return __awaiter11(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams2(method, options2, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve(data)).catch((error2) => handleError2(error2, reject));
    });
  });
}
function _sessionResponse(data) {
  var _a;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    session.expires_at = expiresAt(data.expires_in);
  }
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { session, user }, error: null };
}
function _userResponse(data) {
  var _a;
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { user }, error: null };
}
function _ssoResponse(data) {
  return { data, error: null };
}
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
function _noResolveJsonResponse(data) {
  return data;
}
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}
var __awaiter11, __rest, _getErrorMessage2, handleError2, _getRequestParams2;
var init_fetch3 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js"() {
    init_helpers3();
    init_errors2();
    __awaiter11 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    __rest = function(s3, e2) {
      var t2 = {};
      for (var p2 in s3)
        if (Object.prototype.hasOwnProperty.call(s3, p2) && e2.indexOf(p2) < 0)
          t2[p2] = s3[p2];
      if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s3); i2 < p2.length; i2++) {
          if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p2[i2]))
            t2[p2[i2]] = s3[p2[i2]];
        }
      return t2;
    };
    _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    handleError2 = (error2, reject) => __awaiter11(void 0, void 0, void 0, function* () {
      const NETWORK_ERROR_CODES = [502, 503, 504];
      if (!looksLikeFetchResponse(error2)) {
        reject(new AuthRetryableFetchError(_getErrorMessage2(error2), 0));
      } else if (NETWORK_ERROR_CODES.includes(error2.status)) {
        reject(new AuthRetryableFetchError(_getErrorMessage2(error2), error2.status));
      } else {
        error2.json().then((err) => {
          reject(new AuthApiError(_getErrorMessage2(err), error2.status || 500));
        }).catch((e2) => {
          reject(new AuthUnknownError(_getErrorMessage2(e2), e2));
        });
      }
    });
    _getRequestParams2 = (method, options2, parameters, body) => {
      const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
      params.body = JSON.stringify(body);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js
var __awaiter12, __rest2, GoTrueAdminApi;
var init_GoTrueAdminApi = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js"() {
    init_fetch3();
    init_helpers3();
    init_errors2();
    __awaiter12 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    __rest2 = function(s3, e2) {
      var t2 = {};
      for (var p2 in s3)
        if (Object.prototype.hasOwnProperty.call(s3, p2) && e2.indexOf(p2) < 0)
          t2[p2] = s3[p2];
      if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s3); i2 < p2.length; i2++) {
          if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p2[i2]))
            t2[p2[i2]] = s3[p2[i2]];
        }
      return t2;
    };
    GoTrueAdminApi = class {
      constructor({ url = "", headers = {}, fetch: fetch2 }) {
        this.url = url;
        this.headers = headers;
        this.fetch = resolveFetch4(fetch2);
        this.mfa = {
          listFactors: this._listFactors.bind(this),
          deleteFactor: this._deleteFactor.bind(this)
        };
      }
      /**
       * Removes a logged-in session.
       * @param jwt A valid, logged-in JWT.
       */
      signOut(jwt) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            yield _request(this.fetch, "POST", `${this.url}/logout`, {
              headers: this.headers,
              jwt,
              noResolveJson: true
            });
            return { data: null, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Sends an invite link to an email address.
       * @param email The email address of the user.
       * @param options.redirectTo A URL or mobile deeplink to send the user to after they are confirmed.
       * @param options.data Optional user metadata
       */
      inviteUserByEmail(email, options2 = {}) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "POST", `${this.url}/invite`, {
              body: { email, data: options2.data },
              headers: this.headers,
              redirectTo: options2.redirectTo,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Generates email links and OTPs to be sent via a custom email provider.
       * @param email The user's email.
       * @param options.password User password. For signup only.
       * @param options.data Optional user metadata. For signup only.
       * @param options.redirectTo The redirect url which should be appended to the generated link
       */
      generateLink(params) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            const { options: options2 } = params, rest = __rest2(params, ["options"]);
            const body = Object.assign(Object.assign({}, rest), options2);
            if ("newEmail" in rest) {
              body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
              delete body["newEmail"];
            }
            return yield _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
              body,
              headers: this.headers,
              xform: _generateLinkResponse,
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.redirectTo
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return {
                data: {
                  properties: null,
                  user: null
                },
                error: error2
              };
            }
            throw error2;
          }
        });
      }
      // User Admin API
      /**
       * Creates a new user.
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      createUser(attributes) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "POST", `${this.url}/admin/users`, {
              body: attributes,
              headers: this.headers,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Get a list of users.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
       */
      listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            const pagination = { nextPage: null, lastPage: 0, total: 0 };
            const response = yield _request(this.fetch, "GET", `${this.url}/admin/users`, {
              headers: this.headers,
              noResolveJson: true,
              query: {
                page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
                per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
              },
              xform: _noResolveJsonResponse
            });
            if (response.error)
              throw response.error;
            const users = yield response.json();
            const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
            const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
            if (links.length > 0) {
              links.forEach((link) => {
                const page2 = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
                const rel = JSON.parse(link.split(";")[1].split("=")[1]);
                pagination[`${rel}Page`] = page2;
              });
              pagination.total = parseInt(total);
            }
            return { data: Object.assign(Object.assign({}, users), pagination), error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { users: [] }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Get user by id.
       *
       * @param uid The user's unique identifier
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      getUserById(uid) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
              headers: this.headers,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Updates the user data.
       *
       * @param attributes The data you want to update.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      updateUserById(uid, attributes) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
              body: attributes,
              headers: this.headers,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Delete a user. Requires a `service_role` key.
       *
       * @param id The user id you want to remove.
       * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema.
       * Defaults to false for backward compatibility.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      deleteUser(id, shouldSoftDelete = false) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
              headers: this.headers,
              body: {
                should_soft_delete: shouldSoftDelete
              },
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      _listFactors(params) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            const { data, error: error2 } = yield _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
              headers: this.headers,
              xform: (factors) => {
                return { data: { factors }, error: null };
              }
            });
            return { data, error: error2 };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      _deleteFactor(params) {
        return __awaiter12(this, void 0, void 0, function* () {
          try {
            const data = yield _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/version.js
var version5;
var init_version5 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/version.js"() {
    version5 = "2.26.0";
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
var GOTRUE_URL, STORAGE_KEY, DEFAULT_HEADERS5, EXPIRY_MARGIN;
var init_constants5 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/constants.js"() {
    init_version5();
    GOTRUE_URL = "http://localhost:9999";
    STORAGE_KEY = "supabase.auth.token";
    DEFAULT_HEADERS5 = { "X-Client-Info": `gotrue-js/${version5}` };
    EXPIRY_MARGIN = 10;
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js
var localStorageAdapter, local_storage_default;
var init_local_storage = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js"() {
    init_helpers3();
    localStorageAdapter = {
      getItem: (key2) => {
        if (!supportsLocalStorage()) {
          return null;
        }
        return globalThis.localStorage.getItem(key2);
      },
      setItem: (key2, value2) => {
        if (!supportsLocalStorage()) {
          return;
        }
        globalThis.localStorage.setItem(key2, value2);
      },
      removeItem: (key2) => {
        if (!supportsLocalStorage()) {
          return;
        }
        globalThis.localStorage.removeItem(key2);
      }
    };
    local_storage_default = localStorageAdapter;
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e2) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
var init_polyfills = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js"() {
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
var __awaiter13, DEFAULT_OPTIONS, AUTO_REFRESH_TICK_DURATION, AUTO_REFRESH_TICK_THRESHOLD, GoTrueClient;
var init_GoTrueClient = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js"() {
    init_GoTrueAdminApi();
    init_constants5();
    init_errors2();
    init_fetch3();
    init_helpers3();
    init_local_storage();
    init_polyfills();
    __awaiter13 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    polyfillGlobalThis();
    DEFAULT_OPTIONS = {
      url: GOTRUE_URL,
      storageKey: STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      headers: DEFAULT_HEADERS5,
      flowType: "implicit"
    };
    AUTO_REFRESH_TICK_DURATION = 30 * 1e3;
    AUTO_REFRESH_TICK_THRESHOLD = 3;
    GoTrueClient = class {
      /**
       * Create a new client for use in the browser.
       */
      constructor(options2) {
        var _a;
        this.stateChangeEmitters = /* @__PURE__ */ new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        this.broadcastChannel = null;
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
        this.inMemorySession = null;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.persistSession = settings.persistSession;
        this.storage = settings.storage || local_storage_default;
        this.admin = new GoTrueAdminApi({
          url: settings.url,
          headers: settings.headers,
          fetch: settings.fetch
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = resolveFetch4(settings.fetch);
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        this.mfa = {
          verify: this._verify.bind(this),
          enroll: this._enroll.bind(this),
          unenroll: this._unenroll.bind(this),
          challenge: this._challenge.bind(this),
          listFactors: this._listFactors.bind(this),
          challengeAndVerify: this._challengeAndVerify.bind(this),
          getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        };
        if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
          try {
            this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
          } catch (e2) {
            console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e2);
          }
          (_a = this.broadcastChannel) === null || _a === void 0 ? void 0 : _a.addEventListener("message", (event) => {
            this._notifyAllSubscribers(event.data.event, event.data.session, false);
          });
        }
        this.initialize();
      }
      /**
       * Initializes the client session either from the url or from storage.
       * This method is automatically called when instantiating the client, but should also be called
       * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
       */
      initialize() {
        if (!this.initializePromise) {
          this.initializePromise = this._initialize();
        }
        return this.initializePromise;
      }
      /**
       * IMPORTANT:
       * 1. Never throw in this method, as it is called from the constructor
       * 2. Never return a session from this method as it would be cached over
       *    the whole lifetime of the client
       */
      _initialize() {
        return __awaiter13(this, void 0, void 0, function* () {
          if (this.initializePromise) {
            return this.initializePromise;
          }
          try {
            const isPKCEFlow = yield this._isPKCEFlow();
            if (this.detectSessionInUrl && this._isImplicitGrantFlow() || isPKCEFlow) {
              const { data, error: error2 } = yield this._getSessionFromUrl(isPKCEFlow);
              if (error2) {
                yield this._removeSession();
                return { error: error2 };
              }
              const { session, redirectType } = data;
              yield this._saveSession(session);
              setTimeout(() => {
                if (redirectType === "recovery") {
                  this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
                } else {
                  this._notifyAllSubscribers("SIGNED_IN", session);
                }
              }, 0);
              return { error: null };
            }
            yield this._recoverAndRefresh();
            return { error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { error: error2 };
            }
            return {
              error: new AuthUnknownError("Unexpected error during initialization", error2)
            };
          } finally {
            yield this._handleVisibilityChange();
          }
        });
      }
      /**
       * Creates a new user.
       *
       * Be aware that if a user account exists in the system you may get back an
       * error message that attempts to hide this information from the user.
       *
       * @returns A logged-in session if the server has "autoconfirm" ON
       * @returns A user if the server has "autoconfirm" OFF
       */
      signUp(credentials) {
        var _a, _b, _c;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            let res;
            if ("email" in credentials) {
              const { email, password, options: options2 } = credentials;
              let codeChallenge = null;
              let codeChallengeMethod = null;
              if (this.flowType === "pkce") {
                const codeVerifier = generatePKCEVerifier();
                yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                codeChallenge = yield generatePKCEChallenge(codeVerifier);
                codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
              }
              res = yield _request(this.fetch, "POST", `${this.url}/signup`, {
                headers: this.headers,
                redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo,
                body: {
                  email,
                  password,
                  data: (_a = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _a !== void 0 ? _a : {},
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                  code_challenge: codeChallenge,
                  code_challenge_method: codeChallengeMethod
                },
                xform: _sessionResponse
              });
            } else if ("phone" in credentials) {
              const { phone, password, options: options2 } = credentials;
              res = yield _request(this.fetch, "POST", `${this.url}/signup`, {
                headers: this.headers,
                body: {
                  phone,
                  password,
                  data: (_b = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _b !== void 0 ? _b : {},
                  channel: (_c = options2 === null || options2 === void 0 ? void 0 : options2.channel) !== null && _c !== void 0 ? _c : "sms",
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
                },
                xform: _sessionResponse
              });
            } else {
              throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
            }
            const { data, error: error2 } = res;
            if (error2 || !data) {
              return { data: { user: null, session: null }, error: error2 };
            }
            const session = data.session;
            const user = data.user;
            if (data.session) {
              yield this._saveSession(data.session);
              this._notifyAllSubscribers("SIGNED_IN", session);
            }
            return { data: { user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Log in an existing user with an email and password or phone and password.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or that the
       * email/phone and password combination is wrong or that the account can only
       * be accessed via social login.
       */
      signInWithPassword(credentials) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            let res;
            if ("email" in credentials) {
              const { email, password, options: options2 } = credentials;
              res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                headers: this.headers,
                body: {
                  email,
                  password,
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
                },
                xform: _sessionResponse
              });
            } else if ("phone" in credentials) {
              const { phone, password, options: options2 } = credentials;
              res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                headers: this.headers,
                body: {
                  phone,
                  password,
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
                },
                xform: _sessionResponse
              });
            } else {
              throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
            }
            const { data, error: error2 } = res;
            if (error2 || !data)
              return { data: { user: null, session: null }, error: error2 };
            if (data.session) {
              yield this._saveSession(data.session);
              this._notifyAllSubscribers("SIGNED_IN", data.session);
            }
            return { data, error: error2 };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Log in an existing user via a third-party provider.
       */
      signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        return __awaiter13(this, void 0, void 0, function* () {
          yield this._removeSession();
          return yield this._handleProviderSignIn(credentials.provider, {
            redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
            scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
            queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
            skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
          });
        });
      }
      /**
       * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
       */
      exchangeCodeForSession(authCode) {
        return __awaiter13(this, void 0, void 0, function* () {
          const codeVerifier = yield getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
          const { data, error: error2 } = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
            headers: this.headers,
            body: {
              auth_code: authCode,
              code_verifier: codeVerifier
            },
            xform: _sessionResponse
          });
          yield removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
          if (error2 || !data)
            return { data: { user: null, session: null }, error: error2 };
          if (data.session) {
            yield this._saveSession(data.session);
            this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return { data, error: error2 };
        });
      }
      /**
       * Allows signing in with an ID token issued by certain supported providers.
       * The ID token is verified for validity and a new session is established.
       *
       * @experimental
       */
      signInWithIdToken(credentials) {
        return __awaiter13(this, void 0, void 0, function* () {
          yield this._removeSession();
          try {
            const { options: options2, provider, token, nonce } = credentials;
            const res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
              headers: this.headers,
              body: {
                provider,
                id_token: token,
                nonce,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              xform: _sessionResponse
            });
            const { data, error: error2 } = res;
            if (error2 || !data)
              return { data: { user: null, session: null }, error: error2 };
            if (data.session) {
              yield this._saveSession(data.session);
              this._notifyAllSubscribers("SIGNED_IN", data.session);
            }
            return { data, error: error2 };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Log in a user using magiclink or a one-time password (OTP).
       *
       * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
       * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
       * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or, that the account
       * can only be accessed via social login.
       *
       * Do note that you will need to configure a Whatsapp sender on Twilio
       * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
       * channel is not supported on other providers
       * at this time.
       */
      signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            if ("email" in credentials) {
              const { email, options: options2 } = credentials;
              let codeChallenge = null;
              let codeChallengeMethod = null;
              if (this.flowType === "pkce") {
                const codeVerifier = generatePKCEVerifier();
                yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                codeChallenge = yield generatePKCEChallenge(codeVerifier);
                codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
              }
              const { error: error2 } = yield _request(this.fetch, "POST", `${this.url}/otp`, {
                headers: this.headers,
                body: {
                  email,
                  data: (_a = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _a !== void 0 ? _a : {},
                  create_user: (_b = options2 === null || options2 === void 0 ? void 0 : options2.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                  code_challenge: codeChallenge,
                  code_challenge_method: codeChallengeMethod
                },
                redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo
              });
              return { data: { user: null, session: null }, error: error2 };
            }
            if ("phone" in credentials) {
              const { phone, options: options2 } = credentials;
              const { error: error2 } = yield _request(this.fetch, "POST", `${this.url}/otp`, {
                headers: this.headers,
                body: {
                  phone,
                  data: (_c = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _c !== void 0 ? _c : {},
                  create_user: (_d = options2 === null || options2 === void 0 ? void 0 : options2.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                  channel: (_e = options2 === null || options2 === void 0 ? void 0 : options2.channel) !== null && _e !== void 0 ? _e : "sms"
                }
              });
              return { data: { user: null, session: null }, error: error2 };
            }
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Log in a user given a User supplied OTP received via mobile.
       */
      verifyOtp(params) {
        var _a, _b;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            const { data, error: error2 } = yield _request(this.fetch, "POST", `${this.url}/verify`, {
              headers: this.headers,
              body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: (_a = params.options) === null || _a === void 0 ? void 0 : _a.captchaToken } }),
              redirectTo: (_b = params.options) === null || _b === void 0 ? void 0 : _b.redirectTo,
              xform: _sessionResponse
            });
            if (error2) {
              throw error2;
            }
            if (!data) {
              throw new Error("An error occurred on token verification.");
            }
            const session = data.session;
            const user = data.user;
            if (session === null || session === void 0 ? void 0 : session.access_token) {
              yield this._saveSession(session);
              this._notifyAllSubscribers("SIGNED_IN", session);
            }
            return { data: { user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Attempts a single-sign on using an enterprise Identity Provider. A
       * successful SSO attempt will redirect the current page to the identity
       * provider authorization page. The redirect URL is implementation and SSO
       * protocol specific.
       *
       * You can use it by providing a SSO domain. Typically you can extract this
       * domain by asking users for their email address. If this domain is
       * registered on the Auth instance the redirect will use that organization's
       * currently active SSO Identity Provider for the login.
       *
       * If you have built an organization-specific login page, you can use the
       * organization's SSO Identity Provider UUID directly instead.
       */
      signInWithSSO(params) {
        var _a, _b, _c;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            return yield _request(this.fetch, "POST", `${this.url}/sso`, {
              body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true }),
              headers: this.headers,
              xform: _ssoResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
       */
      resend(credentials) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            const endpoint = `${this.url}/resend`;
            if ("email" in credentials) {
              const { email, type, options: options2 } = credentials;
              const { error: error2 } = yield _request(this.fetch, "POST", endpoint, {
                headers: this.headers,
                body: {
                  email,
                  type,
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
                }
              });
              return { data: { user: null, session: null }, error: error2 };
            } else if ("phone" in credentials) {
              const { phone, type, options: options2 } = credentials;
              const { error: error2 } = yield _request(this.fetch, "POST", endpoint, {
                headers: this.headers,
                body: {
                  phone,
                  type,
                  gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
                }
              });
              return { data: { user: null, session: null }, error: error2 };
            }
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Returns the session, refreshing it if necessary.
       * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
       */
      getSession() {
        return __awaiter13(this, void 0, void 0, function* () {
          yield this.initializePromise;
          let currentSession = null;
          if (this.persistSession) {
            const maybeSession = yield getItemAsync(this.storage, this.storageKey);
            if (maybeSession !== null) {
              if (this._isValidSession(maybeSession)) {
                currentSession = maybeSession;
              } else {
                yield this._removeSession();
              }
            }
          } else {
            currentSession = this.inMemorySession;
          }
          if (!currentSession) {
            return { data: { session: null }, error: null };
          }
          const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1e3 : false;
          if (!hasExpired) {
            return { data: { session: currentSession }, error: null };
          }
          const { session, error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
          if (error2) {
            return { data: { session: null }, error: error2 };
          }
          return { data: { session }, error: null };
        });
      }
      /**
       * Gets the current user details if there is an existing session.
       * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
       */
      getUser(jwt) {
        var _a, _b;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            if (!jwt) {
              const { data, error: error2 } = yield this.getSession();
              if (error2) {
                throw error2;
              }
              jwt = (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0;
            }
            return yield _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Updates user data for a logged in user.
       */
      updateUser(attributes, options2 = {}) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { data: sessionData, error: sessionError } = yield this.getSession();
            if (sessionError) {
              throw sessionError;
            }
            if (!sessionData.session) {
              throw new AuthSessionMissingError();
            }
            const session = sessionData.session;
            const { data, error: userError } = yield _request(this.fetch, "PUT", `${this.url}/user`, {
              headers: this.headers,
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo,
              body: attributes,
              jwt: session.access_token,
              xform: _userResponse
            });
            if (userError)
              throw userError;
            session.user = data.user;
            yield this._saveSession(session);
            this._notifyAllSubscribers("USER_UPDATED", session);
            return { data: { user: session.user }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Decodes a JWT (without performing any validation).
       */
      _decodeJWT(jwt) {
        return decodeJWTPayload(jwt);
      }
      /**
       * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
       * If the refresh token or access token in the current session is invalid, an error will be thrown.
       * @param currentSession The current session that minimally contains an access token and refresh token.
       */
      setSession(currentSession) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            if (!currentSession.access_token || !currentSession.refresh_token) {
              throw new AuthSessionMissingError();
            }
            const timeNow = Date.now() / 1e3;
            let expiresAt2 = timeNow;
            let hasExpired = true;
            let session = null;
            const payload = decodeJWTPayload(currentSession.access_token);
            if (payload.exp) {
              expiresAt2 = payload.exp;
              hasExpired = expiresAt2 <= timeNow;
            }
            if (hasExpired) {
              const { session: refreshedSession, error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
              if (error2) {
                return { data: { user: null, session: null }, error: error2 };
              }
              if (!refreshedSession) {
                return { data: { user: null, session: null }, error: null };
              }
              session = refreshedSession;
            } else {
              const { data, error: error2 } = yield this.getUser(currentSession.access_token);
              if (error2) {
                throw error2;
              }
              session = {
                access_token: currentSession.access_token,
                refresh_token: currentSession.refresh_token,
                user: data.user,
                token_type: "bearer",
                expires_in: expiresAt2 - timeNow,
                expires_at: expiresAt2
              };
              yield this._saveSession(session);
              this._notifyAllSubscribers("SIGNED_IN", session);
            }
            return { data: { user: session.user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { session: null, user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Returns a new session, regardless of expiry status.
       * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
       * If the current session's refresh token is invalid, an error will be thrown.
       * @param currentSession The current session. If passed in, it must contain a refresh token.
       */
      refreshSession(currentSession) {
        var _a;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            if (!currentSession) {
              const { data, error: error3 } = yield this.getSession();
              if (error3) {
                throw error3;
              }
              currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : void 0;
            }
            if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
              throw new AuthSessionMissingError();
            }
            const { session, error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error2) {
              return { data: { user: null, session: null }, error: error2 };
            }
            if (!session) {
              return { data: { user: null, session: null }, error: null };
            }
            return { data: { user: session.user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Gets the session data from a URL string
       */
      _getSessionFromUrl(isPKCEFlow) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            if (!isBrowser())
              throw new AuthImplicitGrantRedirectError("No browser detected.");
            if (this.flowType === "implicit" && !this._isImplicitGrantFlow()) {
              throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
            } else if (this.flowType == "pkce" && !isPKCEFlow) {
              throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
            }
            if (isPKCEFlow) {
              const authCode = getParameterByName("code");
              if (!authCode)
                throw new AuthPKCEGrantCodeExchangeError("No code detected.");
              const { data: data2, error: error3 } = yield this.exchangeCodeForSession(authCode);
              if (error3)
                throw error3;
              if (!data2.session)
                throw new AuthPKCEGrantCodeExchangeError("No session detected.");
              let url = new URL(window.location.href);
              url.searchParams.delete("code");
              window.history.replaceState(window.history.state, "", url.toString());
              return { data: { session: data2.session, redirectType: null }, error: null };
            }
            const error_description = getParameterByName("error_description");
            if (error_description) {
              const error_code = getParameterByName("error_code");
              if (!error_code)
                throw new AuthImplicitGrantRedirectError("No error_code detected.");
              const error3 = getParameterByName("error");
              if (!error3)
                throw new AuthImplicitGrantRedirectError("No error detected.");
              throw new AuthImplicitGrantRedirectError(error_description, { error: error3, code: error_code });
            }
            const provider_token = getParameterByName("provider_token");
            const provider_refresh_token = getParameterByName("provider_refresh_token");
            const access_token = getParameterByName("access_token");
            if (!access_token)
              throw new AuthImplicitGrantRedirectError("No access_token detected.");
            const expires_in = getParameterByName("expires_in");
            if (!expires_in)
              throw new AuthImplicitGrantRedirectError("No expires_in detected.");
            const refresh_token = getParameterByName("refresh_token");
            if (!refresh_token)
              throw new AuthImplicitGrantRedirectError("No refresh_token detected.");
            const token_type = getParameterByName("token_type");
            if (!token_type)
              throw new AuthImplicitGrantRedirectError("No token_type detected.");
            const timeNow = Math.round(Date.now() / 1e3);
            const expires_at = timeNow + parseInt(expires_in);
            const { data, error: error2 } = yield this.getUser(access_token);
            if (error2)
              throw error2;
            const user = data.user;
            const session = {
              provider_token,
              provider_refresh_token,
              access_token,
              expires_in: parseInt(expires_in),
              expires_at,
              refresh_token,
              token_type,
              user
            };
            const redirectType = getParameterByName("type");
            window.location.hash = "";
            return { data: { session, redirectType }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { session: null, redirectType: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
       */
      _isImplicitGrantFlow() {
        return isBrowser() && (Boolean(getParameterByName("access_token")) || Boolean(getParameterByName("error_description")));
      }
      /**
       * Checks if the current URL and backing storage contain parameters given by a PKCE flow
       */
      _isPKCEFlow() {
        return __awaiter13(this, void 0, void 0, function* () {
          const currentStorageContent = yield getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
          return isBrowser() && Boolean(getParameterByName("code")) && Boolean(currentStorageContent);
        });
      }
      /**
       * Inside a browser context, `signOut()` will remove the logged in user from the browser session
       * and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
       *
       * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
       * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
       */
      signOut() {
        var _a;
        return __awaiter13(this, void 0, void 0, function* () {
          const { data, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { error: sessionError };
          }
          const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
          if (accessToken) {
            const { error: error2 } = yield this.admin.signOut(accessToken);
            if (error2) {
              if (!(isAuthApiError(error2) && (error2.status === 404 || error2.status === 401))) {
                return { error: error2 };
              }
            }
          }
          yield this._removeSession();
          yield removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
          this._notifyAllSubscribers("SIGNED_OUT", null);
          return { error: null };
        });
      }
      /**
       * Receive a notification every time an auth event happens.
       * @param callback A callback function to be invoked when an auth event happens.
       */
      onAuthStateChange(callback) {
        const id = uuid();
        const subscription = {
          id,
          callback,
          unsubscribe: () => {
            this.stateChangeEmitters.delete(id);
          }
        };
        this.stateChangeEmitters.set(id, subscription);
        this.emitInitialSession(id);
        return { data: { subscription } };
      }
      emitInitialSession(id) {
        var _a, _b;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { data: { session }, error: error2 } = yield this.getSession();
            if (error2)
              throw error2;
            (_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session);
          } catch (err) {
            (_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null);
            console.error(err);
          }
        });
      }
      /**
       * Sends a password reset request to an email address.
       * @param email The email address of the user.
       * @param options.redirectTo The URL to send the user to after they click the password reset link.
       * @param options.captchaToken Verification token received when the user completes the captcha on the site.
       */
      resetPasswordForEmail(email, options2 = {}) {
        return __awaiter13(this, void 0, void 0, function* () {
          let codeChallenge = null;
          let codeChallengeMethod = null;
          if (this.flowType === "pkce") {
            const codeVerifier = generatePKCEVerifier();
            yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
            codeChallenge = yield generatePKCEChallenge(codeVerifier);
            codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
          }
          try {
            return yield _request(this.fetch, "POST", `${this.url}/recover`, {
              body: {
                email,
                code_challenge: codeChallenge,
                code_challenge_method: codeChallengeMethod,
                gotrue_meta_security: { captcha_token: options2.captchaToken }
              },
              headers: this.headers,
              redirectTo: options2.redirectTo
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Generates a new JWT.
       * @param refreshToken A valid refresh token that was returned on login.
       */
      _refreshAccessToken(refreshToken) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const startedAt = Date.now();
            return yield retryable((attempt) => __awaiter13(this, void 0, void 0, function* () {
              yield sleep(attempt * 200);
              return yield _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
                body: { refresh_token: refreshToken },
                headers: this.headers,
                xform: _sessionResponse
              });
            }), (attempt, _2, result) => result && result.error && result.error instanceof AuthRetryableFetchError && // retryable only if the request can be sent before the backoff overflows the tick duration
            Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { session: null, user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
        return isValidSession;
      }
      _handleProviderSignIn(provider, options2) {
        return __awaiter13(this, void 0, void 0, function* () {
          const url = yield this._getUrlForProvider(provider, {
            redirectTo: options2.redirectTo,
            scopes: options2.scopes,
            queryParams: options2.queryParams
          });
          if (isBrowser() && !options2.skipBrowserRedirect) {
            window.location.assign(url);
          }
          return { data: { provider, url }, error: null };
        });
      }
      /**
       * Recovers the session from LocalStorage and refreshes
       * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
       */
      _recoverAndRefresh() {
        var _a;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const currentSession = yield getItemAsync(this.storage, this.storageKey);
            if (!this._isValidSession(currentSession)) {
              if (currentSession !== null) {
                yield this._removeSession();
              }
              return;
            }
            const timeNow = Math.round(Date.now() / 1e3);
            if (((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + EXPIRY_MARGIN) {
              if (this.autoRefreshToken && currentSession.refresh_token) {
                const { error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
                if (error2) {
                  console.log(error2.message);
                  yield this._removeSession();
                }
              } else {
                yield this._removeSession();
              }
            } else {
              if (this.persistSession) {
                yield this._saveSession(currentSession);
              }
              this._notifyAllSubscribers("SIGNED_IN", currentSession);
            }
          } catch (err) {
            console.error(err);
            return;
          }
        });
      }
      _callRefreshToken(refreshToken) {
        var _a, _b;
        return __awaiter13(this, void 0, void 0, function* () {
          if (this.refreshingDeferred) {
            return this.refreshingDeferred.promise;
          }
          try {
            this.refreshingDeferred = new Deferred();
            if (!refreshToken) {
              throw new AuthSessionMissingError();
            }
            const { data, error: error2 } = yield this._refreshAccessToken(refreshToken);
            if (error2)
              throw error2;
            if (!data.session)
              throw new AuthSessionMissingError();
            yield this._saveSession(data.session);
            this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
            const result = { session: data.session, error: null };
            this.refreshingDeferred.resolve(result);
            return result;
          } catch (error2) {
            if (isAuthError(error2)) {
              const result = { session: null, error: error2 };
              (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
              return result;
            }
            (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error2);
            throw error2;
          } finally {
            this.refreshingDeferred = null;
          }
        });
      }
      _notifyAllSubscribers(event, session, broadcast = true) {
        if (this.broadcastChannel && broadcast) {
          this.broadcastChannel.postMessage({ event, session });
        }
        this.stateChangeEmitters.forEach((x2) => x2.callback(event, session));
      }
      /**
       * set currentSession and currentUser
       * process to _startAutoRefreshToken if possible
       */
      _saveSession(session) {
        return __awaiter13(this, void 0, void 0, function* () {
          if (!this.persistSession) {
            this.inMemorySession = session;
          }
          if (this.persistSession && session.expires_at) {
            yield this._persistSession(session);
          }
        });
      }
      _persistSession(currentSession) {
        return setItemAsync(this.storage, this.storageKey, currentSession);
      }
      _removeSession() {
        return __awaiter13(this, void 0, void 0, function* () {
          if (this.persistSession) {
            yield removeItemAsync(this.storage, this.storageKey);
          } else {
            this.inMemorySession = null;
          }
        });
      }
      /**
       * Removes any registered visibilitychange callback.
       *
       * {@see #startAutoRefresh}
       * {@see #stopAutoRefresh}
       */
      _removeVisibilityChangedCallback() {
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
            window.removeEventListener("visibilitychange", callback);
          }
        } catch (e2) {
          console.error("removing visibilitychange callback failed", e2);
        }
      }
      /**
       * This is the private implementation of {@link #startAutoRefresh}. Use this
       * within the library.
       */
      _startAutoRefresh() {
        return __awaiter13(this, void 0, void 0, function* () {
          yield this._stopAutoRefresh();
          const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
          this.autoRefreshTicker = ticker;
          if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
            ticker.unref();
          } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
            Deno.unrefTimer(ticker);
          }
          yield this._autoRefreshTokenTick();
        });
      }
      /**
       * This is the private implementation of {@link #stopAutoRefresh}. Use this
       * within the library.
       */
      _stopAutoRefresh() {
        return __awaiter13(this, void 0, void 0, function* () {
          const ticker = this.autoRefreshTicker;
          this.autoRefreshTicker = null;
          if (ticker) {
            clearInterval(ticker);
          }
        });
      }
      /**
       * Starts an auto-refresh process in the background. The session is checked
       * every few seconds. Close to the time of expiration a process is started to
       * refresh the session. If refreshing fails it will be retried for as long as
       * necessary.
       *
       * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
       * to call this function, it will be called for you.
       *
       * On browsers the refresh process works only when the tab/window is in the
       * foreground to conserve resources as well as prevent race conditions and
       * flooding auth with requests. If you call this method any managed
       * visibility change callback will be removed and you must manage visibility
       * changes on your own.
       *
       * On non-browser platforms the refresh process works *continuously* in the
       * background, which may not be desireable. You should hook into your
       * platform's foreground indication mechanism and call these methods
       * appropriately to conserve resources.
       *
       * {@see #stopAutoRefresh}
       */
      startAutoRefresh() {
        return __awaiter13(this, void 0, void 0, function* () {
          this._removeVisibilityChangedCallback();
          yield this._startAutoRefresh();
        });
      }
      /**
       * Stops an active auto refresh process running in the background (if any).
       *
       * If you call this method any managed visibility change callback will be
       * removed and you must manage visibility changes on your own.
       *
       * See {@link #startAutoRefresh} for more details.
       */
      stopAutoRefresh() {
        return __awaiter13(this, void 0, void 0, function* () {
          this._removeVisibilityChangedCallback();
          yield this._stopAutoRefresh();
        });
      }
      /**
       * Runs the auto refresh token tick.
       */
      _autoRefreshTokenTick() {
        return __awaiter13(this, void 0, void 0, function* () {
          const now = Date.now();
          try {
            const { data: { session } } = yield this.getSession();
            if (!session || !session.refresh_token || !session.expires_at) {
              return;
            }
            const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION);
            if (expiresInTicks < AUTO_REFRESH_TICK_THRESHOLD) {
              yield this._callRefreshToken(session.refresh_token);
            }
          } catch (e2) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", e2);
          }
        });
      }
      /**
       * Registers callbacks on the browser / platform, which in-turn run
       * algorithms when the browser window/tab are in foreground. On non-browser
       * platforms it assumes always foreground.
       */
      _handleVisibilityChange() {
        return __awaiter13(this, void 0, void 0, function* () {
          if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
            if (this.autoRefreshToken) {
              this.startAutoRefresh();
            }
            return false;
          }
          try {
            this.visibilityChangedCallback = () => __awaiter13(this, void 0, void 0, function* () {
              return yield this._onVisibilityChanged(false);
            });
            window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
            yield this._onVisibilityChanged(true);
          } catch (error2) {
            console.error("_handleVisibilityChange", error2);
          }
        });
      }
      /**
       * Callback registered with `window.addEventListener('visibilitychange')`.
       */
      _onVisibilityChanged(isInitial) {
        return __awaiter13(this, void 0, void 0, function* () {
          if (document.visibilityState === "visible") {
            if (!isInitial) {
              yield this.initializePromise;
              yield this._recoverAndRefresh();
            }
            if (this.autoRefreshToken) {
              this._startAutoRefresh();
            }
          } else if (document.visibilityState === "hidden") {
            if (this.autoRefreshToken) {
              this._stopAutoRefresh();
            }
          }
        });
      }
      /**
       * Generates the relevant login URL for a third-party provider.
       * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
       * @param options.scopes A space-separated list of scopes granted to the OAuth application.
       * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
       */
      _getUrlForProvider(provider, options2) {
        return __awaiter13(this, void 0, void 0, function* () {
          const urlParams = [`provider=${encodeURIComponent(provider)}`];
          if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
            urlParams.push(`redirect_to=${encodeURIComponent(options2.redirectTo)}`);
          }
          if (options2 === null || options2 === void 0 ? void 0 : options2.scopes) {
            urlParams.push(`scopes=${encodeURIComponent(options2.scopes)}`);
          }
          if (this.flowType === "pkce") {
            const codeVerifier = generatePKCEVerifier();
            yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
            const codeChallenge = yield generatePKCEChallenge(codeVerifier);
            const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            const flowParams = new URLSearchParams({
              code_challenge: `${encodeURIComponent(codeChallenge)}`,
              code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
            });
            urlParams.push(flowParams.toString());
          }
          if (options2 === null || options2 === void 0 ? void 0 : options2.queryParams) {
            const query = new URLSearchParams(options2.queryParams);
            urlParams.push(query.toString());
          }
          return `${this.url}/authorize?${urlParams.join("&")}`;
        });
      }
      _unenroll(params) {
        var _a;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { data: sessionData, error: sessionError } = yield this.getSession();
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            return yield _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#enroll}
       */
      _enroll(params) {
        var _a, _b;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { data: sessionData, error: sessionError } = yield this.getSession();
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            const { data, error: error2 } = yield _request(this.fetch, "POST", `${this.url}/factors`, {
              body: {
                friendly_name: params.friendlyName,
                factor_type: params.factorType,
                issuer: params.issuer
              },
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
            if (error2) {
              return { data: null, error: error2 };
            }
            if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
              data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
            }
            return { data, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#verify}
       */
      _verify(params) {
        var _a;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { data: sessionData, error: sessionError } = yield this.getSession();
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            const { data, error: error2 } = yield _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
              body: { code: params.code, challenge_id: params.challengeId },
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
            if (error2) {
              return { data: null, error: error2 };
            }
            yield this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
            this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
            return { data, error: error2 };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#challenge}
       */
      _challenge(params) {
        var _a;
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { data: sessionData, error: sessionError } = yield this.getSession();
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            return yield _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#challengeAndVerify}
       */
      _challengeAndVerify(params) {
        return __awaiter13(this, void 0, void 0, function* () {
          const { data: challengeData, error: challengeError } = yield this._challenge({
            factorId: params.factorId
          });
          if (challengeError) {
            return { data: null, error: challengeError };
          }
          return yield this._verify({
            factorId: params.factorId,
            challengeId: challengeData.id,
            code: params.code
          });
        });
      }
      /**
       * {@see GoTrueMFAApi#listFactors}
       */
      _listFactors() {
        return __awaiter13(this, void 0, void 0, function* () {
          const { data: { user }, error: userError } = yield this.getUser();
          if (userError) {
            return { data: null, error: userError };
          }
          const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
          const totp = factors.filter((factor) => factor.factor_type === "totp" && factor.status === "verified");
          return {
            data: {
              all: factors,
              totp
            },
            error: null
          };
        });
      }
      /**
       * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
       */
      _getAuthenticatorAssuranceLevel() {
        var _a, _b;
        return __awaiter13(this, void 0, void 0, function* () {
          const { data: { session }, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          if (!session) {
            return {
              data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
              error: null
            };
          }
          const payload = this._decodeJWT(session.access_token);
          let currentLevel = null;
          if (payload.aal) {
            currentLevel = payload.aal;
          }
          let nextLevel = currentLevel;
          const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
          if (verifiedFactors.length > 0) {
            nextLevel = "aal2";
          }
          const currentAuthenticationMethods = payload.amr || [];
          return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/types.js
var init_types3 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/lib/types.js"() {
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/index.js
var init_module5 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.26.0/node_modules/@supabase/gotrue-js/dist/module/index.js"() {
    init_GoTrueAdminApi();
    init_GoTrueClient();
    init_types3();
    init_errors2();
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient;
var init_SupabaseAuthClient = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js"() {
    init_module5();
    SupabaseAuthClient = class extends GoTrueClient {
      constructor(options2) {
        super(options2);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var __awaiter14, DEFAULT_GLOBAL_OPTIONS, DEFAULT_DB_OPTIONS, DEFAULT_AUTH_OPTIONS, DEFAULT_REALTIME_OPTIONS, SupabaseClient;
var init_SupabaseClient = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js"() {
    init_module();
    init_module2();
    init_module3();
    init_module4();
    init_constants4();
    init_fetch2();
    init_helpers2();
    init_SupabaseAuthClient();
    __awaiter14 = function(thisArg, _arguments, P2, generator) {
      function adopt(value2) {
        return value2 instanceof P2 ? value2 : new P2(function(resolve) {
          resolve(value2);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value2) {
          try {
            step(generator.next(value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value2) {
          try {
            step(generator["throw"](value2));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DEFAULT_GLOBAL_OPTIONS = {
      headers: DEFAULT_HEADERS4
    };
    DEFAULT_DB_OPTIONS = {
      schema: "public"
    };
    DEFAULT_AUTH_OPTIONS = {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "implicit"
    };
    DEFAULT_REALTIME_OPTIONS = {};
    SupabaseClient = class {
      /**
       * Create a new client for use in the browser.
       * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
       * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
       * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
       * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
       * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
       * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
       * @param options.realtime Options passed along to realtime-js constructor.
       * @param options.global.fetch A custom fetch implementation.
       * @param options.global.headers Any additional headers to send with each network request.
       */
      constructor(supabaseUrl, supabaseKey, options2) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl)
          throw new Error("supabaseUrl is required.");
        if (!supabaseKey)
          throw new Error("supabaseKey is required.");
        const _supabaseUrl = stripTrailingSlash(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        const isPlatform = _supabaseUrl.match(/(supabase\.co)|(supabase\.in)/);
        if (isPlatform) {
          const urlParts = _supabaseUrl.split(".");
          this.functionsUrl = `${urlParts[0]}.functions.${urlParts[1]}.${urlParts[2]}`;
        } else {
          this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        }
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
          db: DEFAULT_DB_OPTIONS,
          realtime: DEFAULT_REALTIME_OPTIONS,
          auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
          global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options2 !== null && options2 !== void 0 ? options2 : {}, DEFAULTS);
        this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : "";
        this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
        this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
        this.rest = new PostgrestClient(`${_supabaseUrl}/rest/v1`, {
          headers: this.headers,
          schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
          fetch: this.fetch
        });
        this._listenForAuthEvents();
      }
      /**
       * Supabase Functions allows you to deploy and invoke edge functions.
       */
      get functions() {
        return new FunctionsClient(this.functionsUrl, {
          headers: this.headers,
          customFetch: this.fetch
        });
      }
      /**
       * Supabase Storage allows you to manage user-generated content, such as photos or videos.
       */
      get storage() {
        return new StorageClient(this.storageUrl, this.headers, this.fetch);
      }
      from(relation) {
        return this.rest.from(relation);
      }
      /**
       * Perform a function call.
       *
       * @param fn  The function name to call.
       * @param args  The parameters to pass to the function call.
       * @param options.head   When set to true, no data will be returned.
       * @param options.count  Count algorithm to use to count rows in a table.
       *
       */
      rpc(fn, args = {}, options2) {
        return this.rest.rpc(fn, args, options2);
      }
      /**
       * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
       *
       * @param {string} name - The name of the Realtime channel.
       * @param {Object} opts - The options to pass to the Realtime channel.
       *
       */
      channel(name, opts = { config: {} }) {
        return this.realtime.channel(name, opts);
      }
      /**
       * Returns all Realtime channels.
       */
      getChannels() {
        return this.realtime.getChannels();
      }
      /**
       * Unsubscribes and removes Realtime channel from Realtime client.
       *
       * @param {RealtimeChannel} channel - The name of the Realtime channel.
       *
       */
      removeChannel(channel) {
        return this.realtime.removeChannel(channel);
      }
      /**
       * Unsubscribes and removes all Realtime channels from Realtime client.
       */
      removeAllChannels() {
        return this.realtime.removeAllChannels();
      }
      _getAccessToken() {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          const { data } = yield this.auth.getSession();
          return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
      }
      _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey, flowType }, headers, fetch2) {
        const authHeaders = {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
          url: this.authUrl,
          headers: Object.assign(Object.assign({}, authHeaders), headers),
          storageKey,
          autoRefreshToken,
          persistSession,
          detectSessionInUrl,
          storage,
          flowType,
          fetch: fetch2
        });
      }
      _initRealtimeClient(options2) {
        return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options2), { params: Object.assign({ apikey: this.supabaseKey }, options2 === null || options2 === void 0 ? void 0 : options2.params) }));
      }
      _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session) => {
          this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, "CLIENT");
        });
        return data;
      }
      _handleTokenChanged(event, token, source) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
          this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
          this.changedAccessToken = token;
        } else if (event === "SIGNED_OUT") {
          this.realtime.setAuth(this.supabaseKey);
          if (source == "STORAGE")
            this.auth.signOut();
          this.changedAccessToken = void 0;
        }
      }
    };
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/index.js
var createClient;
var init_module6 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.22.0/node_modules/@supabase/supabase-js/dist/module/index.js"() {
    init_SupabaseClient();
    init_module5();
    init_module3();
    createClient = (supabaseUrl, supabaseKey, options2) => {
      return new SupabaseClient(supabaseUrl, supabaseKey, options2);
    };
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/webcrypto.js
var webcrypto_default;
var init_webcrypto = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/webcrypto.js"() {
    webcrypto_default = crypto;
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/digest.js
var init_digest = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/digest.js"() {
    init_webcrypto();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder, decoder, MAX_INT32;
var init_buffer_utils = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/buffer_utils.js"() {
    init_digest();
    encoder = new TextEncoder();
    decoder = new TextDecoder();
    MAX_INT32 = 2 ** 32;
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64, encode, decodeBase64, decode;
var init_base64url = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/base64url.js"() {
    init_buffer_utils();
    encodeBase64 = (input) => {
      let unencoded = input;
      if (typeof unencoded === "string") {
        unencoded = encoder.encode(unencoded);
      }
      const CHUNK_SIZE = 32768;
      const arr = [];
      for (let i2 = 0; i2 < unencoded.length; i2 += CHUNK_SIZE) {
        arr.push(String.fromCharCode.apply(null, unencoded.subarray(i2, i2 + CHUNK_SIZE)));
      }
      return btoa(arr.join(""));
    };
    encode = (input) => {
      return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    };
    decodeBase64 = (encoded) => {
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let i2 = 0; i2 < binary.length; i2++) {
        bytes[i2] = binary.charCodeAt(i2);
      }
      return bytes;
    };
    decode = (input) => {
      let encoded = input;
      if (encoded instanceof Uint8Array) {
        encoded = decoder.decode(encoded);
      }
      encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
      try {
        return decodeBase64(encoded);
      } catch (_a) {
        throw new TypeError("The input to be decoded is not correctly encoded.");
      }
    };
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/errors.js
var init_errors3 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/errors.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/random.js
var random_default;
var init_random = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/random.js"() {
    init_webcrypto();
    random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/iv.js
var init_iv = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/iv.js"() {
    init_errors3();
    init_random();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/check_iv_length.js
var init_check_iv_length = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/check_iv_length.js"() {
    init_errors3();
    init_iv();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/check_cek_length.js
var init_check_cek_length = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/check_cek_length.js"() {
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/timing_safe_equal.js
var init_timing_safe_equal = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/timing_safe_equal.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/crypto_key.js
var init_crypto_key = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/crypto_key.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/invalid_key_input.js
var init_invalid_key_input = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/invalid_key_input.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/is_key_like.js
var init_is_key_like = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/is_key_like.js"() {
    init_webcrypto();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/decrypt.js
var init_decrypt = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/decrypt.js"() {
    init_buffer_utils();
    init_check_iv_length();
    init_check_cek_length();
    init_timing_safe_equal();
    init_errors3();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/zlib.js
var init_zlib = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/zlib.js"() {
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/is_disjoint.js
var init_is_disjoint = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/is_disjoint.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/is_object.js
var init_is_object = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/is_object.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/bogus.js
var init_bogus = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/bogus.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/aeskw.js
var init_aeskw = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/aeskw.js"() {
    init_bogus();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/ecdhes.js
var init_ecdhes = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/ecdhes.js"() {
    init_buffer_utils();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/check_p2s.js
var init_check_p2s = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/check_p2s.js"() {
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/pbes2kw.js
var init_pbes2kw = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/pbes2kw.js"() {
    init_random();
    init_buffer_utils();
    init_base64url();
    init_aeskw();
    init_check_p2s();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/subtle_rsaes.js
var init_subtle_rsaes = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/subtle_rsaes.js"() {
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/check_key_length.js
var init_check_key_length = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/check_key_length.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/rsaes.js
var init_rsaes = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/rsaes.js"() {
    init_subtle_rsaes();
    init_bogus();
    init_webcrypto();
    init_crypto_key();
    init_check_key_length();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/cek.js
var init_cek = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/cek.js"() {
    init_errors3();
    init_random();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/format_pem.js
var init_format_pem = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/format_pem.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/asn1.js
var init_asn1 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/asn1.js"() {
    init_webcrypto();
    init_invalid_key_input();
    init_base64url();
    init_format_pem();
    init_errors3();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/jwk_to_key.js
var init_jwk_to_key = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/jwk_to_key.js"() {
    init_webcrypto();
    init_errors3();
    init_base64url();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/import.js
var init_import = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/import.js"() {
    init_base64url();
    init_asn1();
    init_jwk_to_key();
    init_errors3();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/check_key_type.js
var init_check_key_type = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/check_key_type.js"() {
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/encrypt.js
var init_encrypt = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/encrypt.js"() {
    init_buffer_utils();
    init_check_iv_length();
    init_check_cek_length();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_errors3();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/aesgcmkw.js
var init_aesgcmkw = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/aesgcmkw.js"() {
    init_encrypt();
    init_decrypt();
    init_iv();
    init_base64url();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/decrypt_key_management.js
var init_decrypt_key_management = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/decrypt_key_management.js"() {
    init_aeskw();
    init_ecdhes();
    init_pbes2kw();
    init_rsaes();
    init_base64url();
    init_errors3();
    init_cek();
    init_import();
    init_check_key_type();
    init_is_object();
    init_aesgcmkw();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/validate_crit.js
var init_validate_crit = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/validate_crit.js"() {
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/validate_algorithms.js
var init_validate_algorithms = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/validate_algorithms.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/flattened/decrypt.js
var init_decrypt2 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/flattened/decrypt.js"() {
    init_base64url();
    init_decrypt();
    init_zlib();
    init_errors3();
    init_is_disjoint();
    init_is_object();
    init_decrypt_key_management();
    init_buffer_utils();
    init_cek();
    init_validate_crit();
    init_validate_algorithms();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/compact/decrypt.js
var init_decrypt3 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/compact/decrypt.js"() {
    init_decrypt2();
    init_errors3();
    init_buffer_utils();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/general/decrypt.js
var init_decrypt4 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/general/decrypt.js"() {
    init_decrypt2();
    init_errors3();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/key_to_jwk.js
var init_key_to_jwk = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/key_to_jwk.js"() {
    init_webcrypto();
    init_invalid_key_input();
    init_base64url();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/export.js
var init_export = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/export.js"() {
    init_asn1();
    init_asn1();
    init_key_to_jwk();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/encrypt_key_management.js
var init_encrypt_key_management = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/encrypt_key_management.js"() {
    init_aeskw();
    init_ecdhes();
    init_pbes2kw();
    init_rsaes();
    init_base64url();
    init_cek();
    init_errors3();
    init_export();
    init_check_key_type();
    init_aesgcmkw();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/flattened/encrypt.js
var unprotected;
var init_encrypt2 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/flattened/encrypt.js"() {
    init_base64url();
    init_encrypt();
    init_zlib();
    init_iv();
    init_encrypt_key_management();
    init_errors3();
    init_is_disjoint();
    init_buffer_utils();
    init_validate_crit();
    unprotected = Symbol();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/general/encrypt.js
var init_encrypt3 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/general/encrypt.js"() {
    init_encrypt2();
    init_errors3();
    init_cek();
    init_is_disjoint();
    init_encrypt_key_management();
    init_base64url();
    init_validate_crit();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/subtle_dsa.js
var init_subtle_dsa = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/subtle_dsa.js"() {
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
var init_get_sign_verify_key = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/get_sign_verify_key.js"() {
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/verify.js
var init_verify = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/verify.js"() {
    init_subtle_dsa();
    init_webcrypto();
    init_check_key_length();
    init_get_sign_verify_key();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/flattened/verify.js
var init_verify2 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/flattened/verify.js"() {
    init_base64url();
    init_verify();
    init_errors3();
    init_buffer_utils();
    init_is_disjoint();
    init_is_object();
    init_check_key_type();
    init_validate_crit();
    init_validate_algorithms();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/compact/verify.js
var init_verify3 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/compact/verify.js"() {
    init_verify2();
    init_errors3();
    init_buffer_utils();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/general/verify.js
var init_verify4 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/general/verify.js"() {
    init_verify2();
    init_errors3();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/epoch.js
var init_epoch = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/epoch.js"() {
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/secs.js
var minute, hour, day, week, year;
var init_secs = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/secs.js"() {
    minute = 60;
    hour = minute * 60;
    day = hour * 24;
    week = day * 7;
    year = day * 365.25;
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/jwt_claims_set.js
var init_jwt_claims_set = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/lib/jwt_claims_set.js"() {
    init_errors3();
    init_buffer_utils();
    init_epoch();
    init_secs();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/verify.js
var init_verify5 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/verify.js"() {
    init_verify3();
    init_jwt_claims_set();
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/decrypt.js
var init_decrypt5 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/decrypt.js"() {
    init_decrypt3();
    init_jwt_claims_set();
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/compact/encrypt.js
var init_encrypt4 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwe/compact/encrypt.js"() {
    init_encrypt2();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/sign.js
var init_sign = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/sign.js"() {
    init_subtle_dsa();
    init_webcrypto();
    init_check_key_length();
    init_get_sign_verify_key();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/flattened/sign.js
var init_sign2 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/flattened/sign.js"() {
    init_base64url();
    init_sign();
    init_is_disjoint();
    init_errors3();
    init_buffer_utils();
    init_check_key_type();
    init_validate_crit();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/compact/sign.js
var init_sign3 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/compact/sign.js"() {
    init_sign2();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/general/sign.js
var init_sign4 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jws/general/sign.js"() {
    init_sign2();
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/produce.js
var init_produce = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/produce.js"() {
    init_epoch();
    init_is_object();
    init_secs();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/sign.js
var init_sign5 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/sign.js"() {
    init_sign3();
    init_errors3();
    init_buffer_utils();
    init_produce();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/encrypt.js
var init_encrypt5 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/encrypt.js"() {
    init_encrypt4();
    init_buffer_utils();
    init_produce();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwk/thumbprint.js
var init_thumbprint = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwk/thumbprint.js"() {
    init_digest();
    init_base64url();
    init_errors3();
    init_buffer_utils();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwk/embedded.js
var init_embedded = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwk/embedded.js"() {
    init_import();
    init_is_object();
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwks/local.js
var init_local = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwks/local.js"() {
    init_import();
    init_errors3();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/fetch_jwks.js
var init_fetch_jwks = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/fetch_jwks.js"() {
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwks/remote.js
var init_remote = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwks/remote.js"() {
    init_fetch_jwks();
    init_errors3();
    init_local();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/unsecured.js
var init_unsecured = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/jwt/unsecured.js"() {
    init_base64url();
    init_buffer_utils();
    init_errors3();
    init_jwt_claims_set();
    init_produce();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/base64url.js
var base64url_exports2 = {};
__export(base64url_exports2, {
  decode: () => decode2,
  encode: () => encode2
});
var encode2, decode2;
var init_base64url2 = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/base64url.js"() {
    init_base64url();
    encode2 = encode;
    decode2 = decode;
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/decode_protected_header.js
var init_decode_protected_header = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/decode_protected_header.js"() {
    init_base64url2();
    init_buffer_utils();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/decode_jwt.js
var init_decode_jwt = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/util/decode_jwt.js"() {
    init_base64url2();
    init_buffer_utils();
    init_is_object();
    init_errors3();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/generate.js
var init_generate = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/runtime/generate.js"() {
    init_webcrypto();
    init_errors3();
    init_random();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/generate_key_pair.js
var init_generate_key_pair = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/generate_key_pair.js"() {
    init_generate();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/generate_secret.js
var init_generate_secret = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/key/generate_secret.js"() {
    init_generate();
  }
});

// node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/index.js
var init_browser = __esm({
  "node_modules/.pnpm/jose@4.14.4/node_modules/jose/dist/browser/index.js"() {
    init_decrypt3();
    init_decrypt2();
    init_decrypt4();
    init_encrypt3();
    init_verify3();
    init_verify2();
    init_verify4();
    init_verify5();
    init_decrypt5();
    init_encrypt4();
    init_encrypt2();
    init_sign3();
    init_sign2();
    init_sign4();
    init_sign5();
    init_encrypt5();
    init_thumbprint();
    init_embedded();
    init_local();
    init_remote();
    init_unsecured();
    init_export();
    init_import();
    init_decode_protected_header();
    init_decode_jwt();
    init_errors3();
    init_generate_key_pair();
    init_generate_secret();
    init_base64url2();
  }
});

// node_modules/.pnpm/@supabase+auth-helpers-shared@0.3.4_@supabase+supabase-js@2.22.0/node_modules/@supabase/auth-helpers-shared/dist/index.mjs
function parseSupabaseCookie(str) {
  if (!str) {
    return null;
  }
  try {
    const session = JSON.parse(str);
    if (!session) {
      return null;
    }
    if (session.constructor.name === "Object") {
      return session;
    }
    if (session.constructor.name !== "Array") {
      throw new Error(`Unexpected format: ${session.constructor.name}`);
    }
    const [_header, payloadStr, _signature] = session[0].split(".");
    const payload = base64url_exports2.decode(payloadStr);
    const decoder2 = new TextDecoder();
    const { exp, sub, ...user } = JSON.parse(decoder2.decode(payload));
    return {
      expires_at: exp,
      expires_in: exp - Math.round(Date.now() / 1e3),
      token_type: "bearer",
      access_token: session[0],
      refresh_token: session[1],
      provider_token: session[2],
      provider_refresh_token: session[3],
      user: {
        id: sub,
        factors: session[4],
        ...user
      }
    };
  } catch (err) {
    console.warn("Failed to parse cookie string:", err);
    return null;
  }
}
function stringifySupabaseSession(session) {
  return JSON.stringify([
    session.access_token,
    session.refresh_token,
    session.provider_token,
    session.provider_refresh_token,
    session.user.factors
  ]);
}
function isBrowser2() {
  return typeof window !== "undefined";
}
var __create2, __defProp2, __getOwnPropDesc2, __getOwnPropNames2, __getProtoOf2, __hasOwnProp2, __commonJS2, __copyProps2, __toESM2, require_cookie, import_cookie2, import_cookie, export_parseCookies, export_serializeCookie;
var init_dist = __esm({
  "node_modules/.pnpm/@supabase+auth-helpers-shared@0.3.4_@supabase+supabase-js@2.22.0/node_modules/@supabase/auth-helpers-shared/dist/index.mjs"() {
    init_browser();
    __create2 = Object.create;
    __defProp2 = Object.defineProperty;
    __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    __getOwnPropNames2 = Object.getOwnPropertyNames;
    __getProtoOf2 = Object.getPrototypeOf;
    __hasOwnProp2 = Object.prototype.hasOwnProperty;
    __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    require_cookie = __commonJS2({
      "../../node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(exports) {
        "use strict";
        exports.parse = parse3;
        exports.serialize = serialize3;
        var __toString2 = Object.prototype.toString;
        var fieldContentRegExp2 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse3(str, options2) {
          if (typeof str !== "string") {
            throw new TypeError("argument str must be a string");
          }
          var obj = {};
          var opt = options2 || {};
          var dec = opt.decode || decode4;
          var index6 = 0;
          while (index6 < str.length) {
            var eqIdx = str.indexOf("=", index6);
            if (eqIdx === -1) {
              break;
            }
            var endIdx = str.indexOf(";", index6);
            if (endIdx === -1) {
              endIdx = str.length;
            } else if (endIdx < eqIdx) {
              index6 = str.lastIndexOf(";", eqIdx - 1) + 1;
              continue;
            }
            var key2 = str.slice(index6, eqIdx).trim();
            if (void 0 === obj[key2]) {
              var val = str.slice(eqIdx + 1, endIdx).trim();
              if (val.charCodeAt(0) === 34) {
                val = val.slice(1, -1);
              }
              obj[key2] = tryDecode2(val, dec);
            }
            index6 = endIdx + 1;
          }
          return obj;
        }
        function serialize3(name, val, options2) {
          var opt = options2 || {};
          var enc = opt.encode || encode4;
          if (typeof enc !== "function") {
            throw new TypeError("option encode is invalid");
          }
          if (!fieldContentRegExp2.test(name)) {
            throw new TypeError("argument name is invalid");
          }
          var value2 = enc(val);
          if (value2 && !fieldContentRegExp2.test(value2)) {
            throw new TypeError("argument val is invalid");
          }
          var str = name + "=" + value2;
          if (null != opt.maxAge) {
            var maxAge = opt.maxAge - 0;
            if (isNaN(maxAge) || !isFinite(maxAge)) {
              throw new TypeError("option maxAge is invalid");
            }
            str += "; Max-Age=" + Math.floor(maxAge);
          }
          if (opt.domain) {
            if (!fieldContentRegExp2.test(opt.domain)) {
              throw new TypeError("option domain is invalid");
            }
            str += "; Domain=" + opt.domain;
          }
          if (opt.path) {
            if (!fieldContentRegExp2.test(opt.path)) {
              throw new TypeError("option path is invalid");
            }
            str += "; Path=" + opt.path;
          }
          if (opt.expires) {
            var expires = opt.expires;
            if (!isDate2(expires) || isNaN(expires.valueOf())) {
              throw new TypeError("option expires is invalid");
            }
            str += "; Expires=" + expires.toUTCString();
          }
          if (opt.httpOnly) {
            str += "; HttpOnly";
          }
          if (opt.secure) {
            str += "; Secure";
          }
          if (opt.priority) {
            var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
            switch (priority) {
              case "low":
                str += "; Priority=Low";
                break;
              case "medium":
                str += "; Priority=Medium";
                break;
              case "high":
                str += "; Priority=High";
                break;
              default:
                throw new TypeError("option priority is invalid");
            }
          }
          if (opt.sameSite) {
            var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
            switch (sameSite) {
              case true:
                str += "; SameSite=Strict";
                break;
              case "lax":
                str += "; SameSite=Lax";
                break;
              case "strict":
                str += "; SameSite=Strict";
                break;
              case "none":
                str += "; SameSite=None";
                break;
              default:
                throw new TypeError("option sameSite is invalid");
            }
          }
          return str;
        }
        function decode4(str) {
          return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
        }
        function encode4(val) {
          return encodeURIComponent(val);
        }
        function isDate2(val) {
          return __toString2.call(val) === "[object Date]" || val instanceof Date;
        }
        function tryDecode2(str, decode22) {
          try {
            return decode22(str);
          } catch (e2) {
            return str;
          }
        }
      }
    });
    import_cookie2 = __toESM2(require_cookie());
    import_cookie = __toESM2(require_cookie());
    export_parseCookies = import_cookie.parse;
    export_serializeCookie = import_cookie.serialize;
  }
});

// node_modules/.pnpm/@supabase+auth-helpers-sveltekit@0.9.4_@supabase+supabase-js@2.22.0_@sveltejs+kit@1.18.0/node_modules/@supabase/auth-helpers-sveltekit/dist/index.js
function supabaseAuthStorageAdapterSveltekitLoad({
  serverSession,
  cookieOptions: {
    name = "sb-auth-token",
    domain,
    maxAge = 60 * 60 * 24 * 365,
    path = "/",
    sameSite,
    secure
  } = {}
}) {
  if (!isBrowser2()) {
    return {
      async getItem() {
        return JSON.stringify(serverSession);
      },
      setItem() {
      },
      removeItem() {
      }
    };
  }
  return {
    async getItem() {
      const sessionStr = export_parseCookies(document.cookie)[name];
      const session = parseSupabaseCookie(sessionStr);
      return JSON.stringify(session);
    },
    async setItem(_key, value2) {
      const session = JSON.parse(value2);
      const sessionStr = stringifySupabaseSession(session);
      document.cookie = export_serializeCookie(name, sessionStr, {
        domain,
        maxAge,
        path,
        sameSite,
        secure,
        httpOnly: false
      });
    },
    async removeItem() {
      document.cookie = export_serializeCookie(name, "", {
        domain,
        maxAge: 0,
        path,
        sameSite,
        secure,
        httpOnly: false
      });
    }
  };
}
function createSupabaseLoadClient({
  supabaseUrl,
  supabaseKey,
  event,
  serverSession,
  options: options2,
  cookieOptions,
  onAuthStateChange
}) {
  var _a;
  const browser = isBrowser2();
  if (browser && cachedBrowserClient) {
    return cachedBrowserClient;
  }
  onAuthStateChangeSubscription == null ? void 0 : onAuthStateChangeSubscription.unsubscribe();
  const client = createClient(supabaseUrl, supabaseKey, {
    ...options2,
    global: {
      fetch: event.fetch,
      ...options2 == null ? void 0 : options2.global,
      headers: {
        ...(_a = options2 == null ? void 0 : options2.global) == null ? void 0 : _a.headers,
        "X-Client-Info": `${"@supabase/auth-helpers-sveltekit"}@${"0.9.4"}`
      }
    },
    auth: {
      autoRefreshToken: browser,
      detectSessionInUrl: browser,
      persistSession: true,
      storage: supabaseAuthStorageAdapterSveltekitLoad({
        cookieOptions,
        serverSession
      })
    }
  });
  if (browser) {
    cachedBrowserClient = client;
    onAuthStateChangeSubscription = onAuthStateChange ? cachedBrowserClient.auth.onAuthStateChange((event2, authSession) => {
      onAuthStateChange == null ? void 0 : onAuthStateChange(event2, authSession);
    }).data.subscription : void 0;
  }
  return client;
}
function supabaseAuthStorageAdapterSveltekitServer({
  cookies,
  cookieOptions: {
    name = "sb-auth-token",
    domain,
    maxAge = 60 * 60 * 24 * 365,
    path = "/",
    sameSite,
    secure,
    httpOnly = false
  } = {},
  expiryMargin = 60
}) {
  let currentSession;
  let isInitialDelete = true;
  return {
    async getItem() {
      const sessionStr = cookies.get(name);
      const session = currentSession = parseSupabaseCookie(sessionStr);
      if (session == null ? void 0 : session.expires_at) {
        session.expires_at -= expiryMargin;
      }
      return JSON.stringify(session);
    },
    async setItem(_key, value2) {
      const session = JSON.parse(value2);
      const sessionStr = stringifySupabaseSession(session);
      cookies.set(name, sessionStr, {
        domain,
        maxAge,
        path,
        sameSite,
        secure,
        httpOnly
      });
    },
    async removeItem() {
      if (isInitialDelete && (currentSession == null ? void 0 : currentSession.expires_at)) {
        const now = Math.round(Date.now() / 1e3);
        if (currentSession.expires_at < now + 10) {
          isInitialDelete = false;
          return;
        }
      }
      cookies.delete(name, {
        domain,
        maxAge,
        path,
        sameSite,
        secure,
        httpOnly
      });
    }
  };
}
function createSupabaseServerClient({
  supabaseUrl,
  supabaseKey,
  event,
  options: options2,
  cookieOptions,
  expiryMargin
}) {
  var _a;
  return createClient(supabaseUrl, supabaseKey, {
    ...options2,
    global: {
      ...options2 == null ? void 0 : options2.global,
      headers: {
        ...(_a = options2 == null ? void 0 : options2.global) == null ? void 0 : _a.headers,
        "X-Client-Info": `${"@supabase/auth-helpers-sveltekit"}@${"0.9.4"}`
      }
    },
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: true,
      storage: supabaseAuthStorageAdapterSveltekitServer({
        cookies: event.cookies,
        cookieOptions,
        expiryMargin
      })
    }
  });
}
var cachedBrowserClient, onAuthStateChangeSubscription;
var init_dist2 = __esm({
  "node_modules/.pnpm/@supabase+auth-helpers-sveltekit@0.9.4_@supabase+supabase-js@2.22.0_@sveltejs+kit@1.18.0/node_modules/@supabase/auth-helpers-sveltekit/dist/index.js"() {
    init_dist();
    init_module6();
    init_dist();
    init_module6();
    init_dist();
  }
});

// .svelte-kit/output/server/chunks/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
var handle;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
    init_public();
    init_dist2();
    handle = async ({ event, resolve }) => {
      event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_API_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event
      });
      event.locals.getSession = async () => {
        const {
          data: { session }
        } = await event.locals.supabase.auth.getSession();
        return session;
      };
      return resolve(event, {
        /**
         * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
         *
         * https://github.com/sveltejs/kit/issues/8061
         */
        filterSerializedResponseHeaders(name) {
          return name === "content-range";
        }
      });
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, message) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, message);
}
function redirect(status, location2) {
  if (isNaN(status) || status < 300 || status > 308) {
    throw new Error("Invalid status code");
  }
  return new Redirect(status, location2);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder2.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder2.encode(body).byteLength.toString());
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function fail(status, data) {
  return new ActionFailure(status, data);
}
var HttpError, Redirect, ActionFailure, encoder2;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class HttpError2 {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class Redirect2 {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location2) {
        this.status = status;
        this.location = location2;
      }
    };
    ActionFailure = class ActionFailure2 {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder2 = new TextEncoder();
  }
});

// .svelte-kit/output/server/chunks/index2.js
function readable(value2, start) {
  return {
    subscribe: writable(value2, start).subscribe
  };
}
function writable(value2, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value2, new_value)) {
      value2 = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value2);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value2));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value2);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_index3();
    subscriber_queue = [];
  }
});

// .svelte-kit/output/server/entries/pages/_layout.ts.js
var layout_ts_exports = {};
__export(layout_ts_exports, {
  load: () => load
});
var load;
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.ts.js"() {
    init_public();
    init_dist2();
    load = async ({ fetch: fetch2, data, depends }) => {
      depends("supabase:auth");
      const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_API_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch: fetch2 },
        serverSession: data.session
      });
      const {
        data: { session }
      } = await supabase.auth.getSession();
      return { supabase, session };
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.server.ts.js
var layout_server_ts_exports = {};
__export(layout_server_ts_exports, {
  load: () => load2
});
var load2;
var init_layout_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.server.ts.js"() {
    load2 = async ({ locals: { getSession } }) => {
      return {
        session: await getSession()
      };
    };
  }
});

// .svelte-kit/output/server/chunks/singletons.js
function notifiable_store(value2) {
  const store = writable(value2);
  let ready = true;
  function notify() {
    ready = true;
    store.update((val) => val);
  }
  function set(new_value) {
    ready = false;
    store.set(new_value);
  }
  function subscribe2(run2) {
    let old_value;
    return store.subscribe((new_value) => {
      if (old_value === void 0 || ready && new_value !== old_value) {
        run2(old_value = new_value);
      }
    });
  }
  return { notify, set, subscribe: subscribe2 };
}
function create_updated_store() {
  const { set, subscribe: subscribe2 } = writable(false);
  async function check() {
    return false;
  }
  return {
    subscribe: subscribe2,
    check
  };
}
var init_singletons = __esm({
  ".svelte-kit/output/server/chunks/singletons.js"() {
    init_index2();
    ({
      url: notifiable_store({}),
      page: notifiable_store({}),
      navigating: writable(
        /** @type {import('types').Navigation | null} */
        null
      ),
      updated: create_updated_store()
    });
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_index3();
    init_singletons();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-1hgwsyy_START -->${$$result.title = `<title>User Management</title>`, ""}<!-- HEAD_svelte-1hgwsyy_END -->`, ""}

<div class="container" style="padding: 50px 0 100px 0">${slots.default ? slots.default({}) : ``}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  server: () => layout_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets,
  universal: () => layout_ts_exports,
  universal_id: () => universal_id
});
var index, component, universal_id, server_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_ts();
    init_layout_server_ts();
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    universal_id = "src/routes/+layout.ts";
    server_id = "src/routes/+layout.server.ts";
    imports = ["_app/immutable/nodes/0.8e2749aa.js", "_app/immutable/chunks/preload-helper.41c905a7.js", "_app/immutable/chunks/index.1e274763.js", "_app/immutable/chunks/navigation.72ad0ca1.js", "_app/immutable/chunks/singletons.f5ab9338.js"];
    stylesheets = ["_app/immutable/assets/0.727cdc72.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_index3();
    init_singletons();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        updated: stores.updated
      };
    };
    page = {
      /** @param {(value: any) => void} fn */
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index3();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value2) => $page = value2);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.20e8a5b5.js", "_app/immutable/chunks/index.1e274763.js", "_app/immutable/chunks/stores.15190d57.js", "_app/immutable/chunks/singletons.f5ab9338.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  load: () => load3
});
var load3;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_page.server.ts.js"() {
    init_chunks();
    load3 = async ({ url, locals: { getSession } }) => {
      const session = await getSession();
      if (session) {
        throw redirect(303, "/account");
      }
      return { url: url.origin };
    };
  }
});

// node_modules/.pnpm/@supabase+auth-ui-shared@0.1.6_@supabase+supabase-js@2.22.0/node_modules/@supabase/auth-ui-shared/dist/index.mjs
function generateClassNames(classNameKey, defaultStyles, appearance) {
  var _a, _b;
  const classNames = [];
  const className = CLASS_NAMES[classNameKey];
  classNames.push(
    (appearance == null ? void 0 : appearance.prependedClassName) ? (appearance == null ? void 0 : appearance.prependedClassName) + "_" + className : PREPENDED_CLASS_NAMES + "_" + className
  );
  if ((_a = appearance == null ? void 0 : appearance.className) == null ? void 0 : _a[classNameKey]) {
    classNames.push((_b = appearance == null ? void 0 : appearance.className) == null ? void 0 : _b[classNameKey]);
  }
  if ((appearance == null ? void 0 : appearance.extend) === void 0 || (appearance == null ? void 0 : appearance.extend) === true) {
    classNames.push(defaultStyles);
  }
  return classNames;
}
function value(src, next) {
  let k2;
  if (src && next && typeof src === "object" && typeof next === "object") {
    if (Array.isArray(next)) {
      for (k2 = 0; k2 < next.length; k2++) {
        src[k2] = value(src[k2], next[k2]);
      }
    } else {
      for (k2 in next) {
        src[k2] = value(src[k2], next[k2]);
      }
    }
    return src;
  }
  return next;
}
function merge(target, ...args) {
  let len = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    target = value(target, args[i2]);
  }
  return target;
}
function template(string, data) {
  return string.replace(
    /{{(\w+)}}/g,
    (placeholderWithDelimiters, placeholderWithoutDelimiters) => data.hasOwnProperty(placeholderWithoutDelimiters) ? data[placeholderWithoutDelimiters] : placeholderWithDelimiters
  );
}
var ThemeSupa, VIEWS, PREPENDED_CLASS_NAMES, CLASS_NAMES, en_default;
var init_dist3 = __esm({
  "node_modules/.pnpm/@supabase+auth-ui-shared@0.1.6_@supabase+supabase-js@2.22.0/node_modules/@supabase/auth-ui-shared/dist/index.mjs"() {
    ThemeSupa = {
      default: {
        colors: {
          brand: "hsl(153 60.0% 53.0%)",
          brandAccent: "hsl(154 54.8% 45.1%)",
          brandButtonText: "white",
          defaultButtonBackground: "white",
          defaultButtonBackgroundHover: "#eaeaea",
          defaultButtonBorder: "lightgray",
          defaultButtonText: "gray",
          dividerBackground: "#eaeaea",
          inputBackground: "transparent",
          inputBorder: "lightgray",
          inputBorderHover: "gray",
          inputBorderFocus: "gray",
          inputText: "black",
          inputLabelText: "gray",
          inputPlaceholder: "darkgray",
          messageText: "gray",
          messageTextDanger: "red",
          anchorTextColor: "gray",
          anchorTextHoverColor: "darkgray"
        },
        space: {
          spaceSmall: "4px",
          spaceMedium: "8px",
          spaceLarge: "16px",
          labelBottomMargin: "8px",
          anchorBottomMargin: "4px",
          emailInputSpacing: "4px",
          socialAuthSpacing: "4px",
          buttonPadding: "10px 15px",
          inputPadding: "10px 15px"
        },
        fontSizes: {
          baseBodySize: "13px",
          baseInputSize: "14px",
          baseLabelSize: "14px",
          baseButtonSize: "14px"
        },
        fonts: {
          bodyFontFamily: `ui-sans-serif, sans-serif`,
          buttonFontFamily: `ui-sans-serif, sans-serif`,
          inputFontFamily: `ui-sans-serif, sans-serif`,
          labelFontFamily: `ui-sans-serif, sans-serif`
        },
        // fontWeights: {},
        // lineHeights: {},
        // letterSpacings: {},
        // sizes: {},
        borderWidths: {
          buttonBorderWidth: "1px",
          inputBorderWidth: "1px"
        },
        // borderStyles: {},
        radii: {
          borderRadiusButton: "4px",
          buttonBorderRadius: "4px",
          inputBorderRadius: "4px"
        }
        // shadows: {},
        // zIndices: {},
        // transitions: {},
      },
      dark: {
        colors: {
          brandButtonText: "white",
          defaultButtonBackground: "#2e2e2e",
          defaultButtonBackgroundHover: "#3e3e3e",
          defaultButtonBorder: "#3e3e3e",
          defaultButtonText: "white",
          dividerBackground: "#2e2e2e",
          inputBackground: "#1e1e1e",
          inputBorder: "#3e3e3e",
          inputBorderHover: "gray",
          inputBorderFocus: "gray",
          inputText: "white",
          inputPlaceholder: "darkgray"
        }
      }
    };
    VIEWS = {
      SIGN_IN: "sign_in",
      SIGN_UP: "sign_up",
      FORGOTTEN_PASSWORD: "forgotten_password",
      MAGIC_LINK: "magic_link",
      UPDATE_PASSWORD: "update_password",
      VERIFY_OTP: "verify_otp"
    };
    PREPENDED_CLASS_NAMES = "supabase-auth-ui";
    CLASS_NAMES = {
      // interfaces
      ROOT: "root",
      SIGN_IN: VIEWS.SIGN_IN,
      SIGN_UP: VIEWS.SIGN_UP,
      FORGOTTEN_PASSWORD: VIEWS.FORGOTTEN_PASSWORD,
      MAGIC_LINK: VIEWS.MAGIC_LINK,
      UPDATE_PASSWORD: VIEWS.UPDATE_PASSWORD,
      // ui
      anchor: "ui-anchor",
      button: "ui-button",
      container: "ui-container",
      divider: "ui-divider",
      input: "ui-input",
      label: "ui-label",
      loader: "ui-loader",
      message: "ui-message"
    };
    en_default = {
      sign_up: {
        email_label: "Email address",
        password_label: "Create a Password",
        email_input_placeholder: "Your email address",
        password_input_placeholder: "Your password",
        button_label: "Sign up",
        loading_button_label: "Signing up ...",
        social_provider_text: "Sign in with {{provider}}",
        link_text: "Don't have an account? Sign up",
        confirmation_text: "Check your email for the confirmation link"
      },
      sign_in: {
        email_label: "Email address",
        password_label: "Your Password",
        email_input_placeholder: "Your email address",
        password_input_placeholder: "Your password",
        button_label: "Sign in",
        loading_button_label: "Signing in ...",
        social_provider_text: "Sign in with {{provider}}",
        link_text: "Already have an account? Sign in"
      },
      magic_link: {
        email_input_label: "Email address",
        email_input_placeholder: "Your email address",
        button_label: "Send Magic Link",
        loading_button_label: "Sending Magic Link ...",
        link_text: "Send a magic link email",
        confirmation_text: "Check your email for the magic link"
      },
      forgotten_password: {
        email_label: "Email address",
        password_label: "Your Password",
        email_input_placeholder: "Your email address",
        button_label: "Send reset password instructions",
        loading_button_label: "Sending reset instructions ...",
        link_text: "Forgot your password?",
        confirmation_text: "Check your email for the password reset link"
      },
      update_password: {
        password_label: "New password",
        password_input_placeholder: "Your new password",
        button_label: "Update password",
        loading_button_label: "Updating password ...",
        confirmation_text: "Your password has been updated"
      },
      verify_otp: {
        email_input_label: "Email address",
        email_input_placeholder: "Your email address",
        phone_input_label: "Phone number",
        phone_input_placeholder: "Your phone number",
        token_input_label: "Token",
        token_input_placeholder: "Your Otp token",
        button_label: "Verify token",
        loading_button_label: "Signing in ..."
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
var e, t, n, r, i, o, l, s2, a, c, d, g, p, u, h, f, m, b, S, k, y, B, $, x, I, R, z, W, j, E, T, v, M, w, C, P, L, O, A, D, H, N, V, G, F, J, U, Z, X, Y, q, _, Anchor, css$6, Button, Container, Input, Label, css$5, EmailAuth, css$4, ForgottenPassword, css$3, MagicLink, css$2, Icons, Divider, SocialAuth, css$1, UpdatePassword, css, VerifyOtp, Auth, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_index3();
    init_dist3();
    t = "colors";
    n = "sizes";
    r = "space";
    i = { gap: r, gridGap: r, columnGap: r, gridColumnGap: r, rowGap: r, gridRowGap: r, inset: r, insetBlock: r, insetBlockEnd: r, insetBlockStart: r, insetInline: r, insetInlineEnd: r, insetInlineStart: r, margin: r, marginTop: r, marginRight: r, marginBottom: r, marginLeft: r, marginBlock: r, marginBlockEnd: r, marginBlockStart: r, marginInline: r, marginInlineEnd: r, marginInlineStart: r, padding: r, paddingTop: r, paddingRight: r, paddingBottom: r, paddingLeft: r, paddingBlock: r, paddingBlockEnd: r, paddingBlockStart: r, paddingInline: r, paddingInlineEnd: r, paddingInlineStart: r, top: r, right: r, bottom: r, left: r, scrollMargin: r, scrollMarginTop: r, scrollMarginRight: r, scrollMarginBottom: r, scrollMarginLeft: r, scrollMarginX: r, scrollMarginY: r, scrollMarginBlock: r, scrollMarginBlockEnd: r, scrollMarginBlockStart: r, scrollMarginInline: r, scrollMarginInlineEnd: r, scrollMarginInlineStart: r, scrollPadding: r, scrollPaddingTop: r, scrollPaddingRight: r, scrollPaddingBottom: r, scrollPaddingLeft: r, scrollPaddingX: r, scrollPaddingY: r, scrollPaddingBlock: r, scrollPaddingBlockEnd: r, scrollPaddingBlockStart: r, scrollPaddingInline: r, scrollPaddingInlineEnd: r, scrollPaddingInlineStart: r, fontSize: "fontSizes", background: t, backgroundColor: t, backgroundImage: t, borderImage: t, border: t, borderBlock: t, borderBlockEnd: t, borderBlockStart: t, borderBottom: t, borderBottomColor: t, borderColor: t, borderInline: t, borderInlineEnd: t, borderInlineStart: t, borderLeft: t, borderLeftColor: t, borderRight: t, borderRightColor: t, borderTop: t, borderTopColor: t, caretColor: t, color: t, columnRuleColor: t, fill: t, outline: t, outlineColor: t, stroke: t, textDecorationColor: t, fontFamily: "fonts", fontWeight: "fontWeights", lineHeight: "lineHeights", letterSpacing: "letterSpacings", blockSize: n, minBlockSize: n, maxBlockSize: n, inlineSize: n, minInlineSize: n, maxInlineSize: n, width: n, minWidth: n, maxWidth: n, height: n, minHeight: n, maxHeight: n, flexBasis: n, gridTemplateColumns: n, gridTemplateRows: n, borderWidth: "borderWidths", borderTopWidth: "borderWidths", borderRightWidth: "borderWidths", borderBottomWidth: "borderWidths", borderLeftWidth: "borderWidths", borderStyle: "borderStyles", borderTopStyle: "borderStyles", borderRightStyle: "borderStyles", borderBottomStyle: "borderStyles", borderLeftStyle: "borderStyles", borderRadius: "radii", borderTopLeftRadius: "radii", borderTopRightRadius: "radii", borderBottomRightRadius: "radii", borderBottomLeftRadius: "radii", boxShadow: "shadows", textShadow: "shadows", transition: "transitions", zIndex: "zIndices" };
    o = (e2, t2) => "function" == typeof t2 ? { "()": Function.prototype.toString.call(t2) } : t2;
    l = () => {
      const e2 = /* @__PURE__ */ Object.create(null);
      return (t2, n2, ...r2) => {
        const i2 = ((e3) => JSON.stringify(e3, o))(t2);
        return i2 in e2 ? e2[i2] : e2[i2] = n2(t2, ...r2);
      };
    };
    s2 = Symbol.for("sxs.internal");
    a = (e2, t2) => Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2));
    c = (e2) => {
      for (const t2 in e2)
        return true;
      return false;
    };
    ({ hasOwnProperty: d } = Object.prototype);
    g = (e2) => e2.includes("-") ? e2 : e2.replace(/[A-Z]/g, (e3) => "-" + e3.toLowerCase());
    p = /\s+(?![^()]*\))/;
    u = (e2) => (t2) => e2(..."string" == typeof t2 ? String(t2).split(p) : [t2]);
    h = { appearance: (e2) => ({ WebkitAppearance: e2, appearance: e2 }), backfaceVisibility: (e2) => ({ WebkitBackfaceVisibility: e2, backfaceVisibility: e2 }), backdropFilter: (e2) => ({ WebkitBackdropFilter: e2, backdropFilter: e2 }), backgroundClip: (e2) => ({ WebkitBackgroundClip: e2, backgroundClip: e2 }), boxDecorationBreak: (e2) => ({ WebkitBoxDecorationBreak: e2, boxDecorationBreak: e2 }), clipPath: (e2) => ({ WebkitClipPath: e2, clipPath: e2 }), content: (e2) => ({ content: e2.includes('"') || e2.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e2) ? e2 : `"${e2}"` }), hyphens: (e2) => ({ WebkitHyphens: e2, hyphens: e2 }), maskImage: (e2) => ({ WebkitMaskImage: e2, maskImage: e2 }), maskSize: (e2) => ({ WebkitMaskSize: e2, maskSize: e2 }), tabSize: (e2) => ({ MozTabSize: e2, tabSize: e2 }), textSizeAdjust: (e2) => ({ WebkitTextSizeAdjust: e2, textSizeAdjust: e2 }), userSelect: (e2) => ({ WebkitUserSelect: e2, userSelect: e2 }), marginBlock: u((e2, t2) => ({ marginBlockStart: e2, marginBlockEnd: t2 || e2 })), marginInline: u((e2, t2) => ({ marginInlineStart: e2, marginInlineEnd: t2 || e2 })), maxSize: u((e2, t2) => ({ maxBlockSize: e2, maxInlineSize: t2 || e2 })), minSize: u((e2, t2) => ({ minBlockSize: e2, minInlineSize: t2 || e2 })), paddingBlock: u((e2, t2) => ({ paddingBlockStart: e2, paddingBlockEnd: t2 || e2 })), paddingInline: u((e2, t2) => ({ paddingInlineStart: e2, paddingInlineEnd: t2 || e2 })) };
    f = /([\d.]+)([^]*)/;
    m = (e2, t2) => e2.length ? e2.reduce((e3, n2) => (e3.push(...t2.map((e4) => e4.includes("&") ? e4.replace(/&/g, /[ +>|~]/.test(n2) && /&.*&/.test(e4) ? `:is(${n2})` : n2) : n2 + " " + e4)), e3), []) : t2;
    b = (e2, t2) => e2 in S && "string" == typeof t2 ? t2.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, (t3, n2, r2, i2) => n2 + ("stretch" === r2 ? `-moz-available${i2};${g(e2)}:${n2}-webkit-fill-available` : `-moz-fit-content${i2};${g(e2)}:${n2}fit-content`) + i2) : String(t2);
    S = { blockSize: 1, height: 1, inlineSize: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, width: 1 };
    k = (e2) => e2 ? e2 + "-" : "";
    y = (e2, t2, n2) => e2.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, (e3, r2, i2, o2, l2) => "$" == o2 == !!i2 ? e3 : (r2 || "--" == o2 ? "calc(" : "") + "var(--" + ("$" === o2 ? k(t2) + (l2.includes("$") ? "" : k(n2)) + l2.replace(/\$/g, "-") : l2) + ")" + (r2 || "--" == o2 ? "*" + (r2 || "") + (i2 || "1") + ")" : ""));
    B = /\s*,\s*(?![^()]*\))/;
    $ = Object.prototype.toString;
    x = (e2, t2, n2, r2, i2) => {
      let o2, l2, s22;
      const a2 = (e3, t3, n3) => {
        let c2, d2;
        const p2 = (e4) => {
          for (c2 in e4) {
            const x2 = 64 === c2.charCodeAt(0), z2 = x2 && Array.isArray(e4[c2]) ? e4[c2] : [e4[c2]];
            for (d2 of z2) {
              const e5 = /[A-Z]/.test(S2 = c2) ? S2 : S2.replace(/-[^]/g, (e6) => e6[1].toUpperCase()), z3 = "object" == typeof d2 && d2 && d2.toString === $ && (!r2.utils[e5] || !t3.length);
              if (e5 in r2.utils && !z3) {
                const t4 = r2.utils[e5];
                if (t4 !== l2) {
                  l2 = t4, p2(t4(d2)), l2 = null;
                  continue;
                }
              } else if (e5 in h) {
                const t4 = h[e5];
                if (t4 !== s22) {
                  s22 = t4, p2(t4(d2)), s22 = null;
                  continue;
                }
              }
              if (x2 && (u2 = c2.slice(1) in r2.media ? "@media " + r2.media[c2.slice(1)] : c2, c2 = u2.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, (e6, t4, n4, r3, i3, o3) => {
                const l3 = f.test(t4), s3 = 0.0625 * (l3 ? -1 : 1), [a3, c3] = l3 ? [r3, t4] : [t4, r3];
                return "(" + ("=" === n4[0] ? "" : ">" === n4[0] === l3 ? "max-" : "min-") + a3 + ":" + ("=" !== n4[0] && 1 === n4.length ? c3.replace(f, (e7, t5, r4) => Number(t5) + s3 * (">" === n4 ? 1 : -1) + r4) : c3) + (i3 ? ") and (" + (">" === i3[0] ? "min-" : "max-") + a3 + ":" + (1 === i3.length ? o3.replace(f, (e7, t5, n5) => Number(t5) + s3 * (">" === i3 ? -1 : 1) + n5) : o3) : "") + ")";
              })), z3) {
                const e6 = x2 ? n3.concat(c2) : [...n3], r3 = x2 ? [...t3] : m(t3, c2.split(B));
                void 0 !== o2 && i2(I(...o2)), o2 = void 0, a2(d2, r3, e6);
              } else
                void 0 === o2 && (o2 = [[], t3, n3]), c2 = x2 || 36 !== c2.charCodeAt(0) ? c2 : `--${k(r2.prefix)}${c2.slice(1).replace(/\$/g, "-")}`, d2 = z3 ? d2 : "number" == typeof d2 ? d2 && e5 in R ? String(d2) + "px" : String(d2) : y(b(e5, null == d2 ? "" : d2), r2.prefix, r2.themeMap[e5]), o2[0].push(`${x2 ? `${c2} ` : `${g(c2)}:`}${d2}`);
            }
          }
          var u2, S2;
        };
        p2(e3), void 0 !== o2 && i2(I(...o2)), o2 = void 0;
      };
      a2(e2, t2, n2);
    };
    I = (e2, t2, n2) => `${n2.map((e3) => `${e3}{`).join("")}${t2.length ? `${t2.join(",")}{` : ""}${e2.join(";")}${t2.length ? "}" : ""}${Array(n2.length ? n2.length + 1 : 0).join("}")}`;
    R = { animationDelay: 1, animationDuration: 1, backgroundSize: 1, blockSize: 1, border: 1, borderBlock: 1, borderBlockEnd: 1, borderBlockEndWidth: 1, borderBlockStart: 1, borderBlockStartWidth: 1, borderBlockWidth: 1, borderBottom: 1, borderBottomLeftRadius: 1, borderBottomRightRadius: 1, borderBottomWidth: 1, borderEndEndRadius: 1, borderEndStartRadius: 1, borderInlineEnd: 1, borderInlineEndWidth: 1, borderInlineStart: 1, borderInlineStartWidth: 1, borderInlineWidth: 1, borderLeft: 1, borderLeftWidth: 1, borderRadius: 1, borderRight: 1, borderRightWidth: 1, borderSpacing: 1, borderStartEndRadius: 1, borderStartStartRadius: 1, borderTop: 1, borderTopLeftRadius: 1, borderTopRightRadius: 1, borderTopWidth: 1, borderWidth: 1, bottom: 1, columnGap: 1, columnRule: 1, columnRuleWidth: 1, columnWidth: 1, containIntrinsicSize: 1, flexBasis: 1, fontSize: 1, gap: 1, gridAutoColumns: 1, gridAutoRows: 1, gridTemplateColumns: 1, gridTemplateRows: 1, height: 1, inlineSize: 1, inset: 1, insetBlock: 1, insetBlockEnd: 1, insetBlockStart: 1, insetInline: 1, insetInlineEnd: 1, insetInlineStart: 1, left: 1, letterSpacing: 1, margin: 1, marginBlock: 1, marginBlockEnd: 1, marginBlockStart: 1, marginBottom: 1, marginInline: 1, marginInlineEnd: 1, marginInlineStart: 1, marginLeft: 1, marginRight: 1, marginTop: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, offsetDistance: 1, offsetRotate: 1, outline: 1, outlineOffset: 1, outlineWidth: 1, overflowClipMargin: 1, padding: 1, paddingBlock: 1, paddingBlockEnd: 1, paddingBlockStart: 1, paddingBottom: 1, paddingInline: 1, paddingInlineEnd: 1, paddingInlineStart: 1, paddingLeft: 1, paddingRight: 1, paddingTop: 1, perspective: 1, right: 1, rowGap: 1, scrollMargin: 1, scrollMarginBlock: 1, scrollMarginBlockEnd: 1, scrollMarginBlockStart: 1, scrollMarginBottom: 1, scrollMarginInline: 1, scrollMarginInlineEnd: 1, scrollMarginInlineStart: 1, scrollMarginLeft: 1, scrollMarginRight: 1, scrollMarginTop: 1, scrollPadding: 1, scrollPaddingBlock: 1, scrollPaddingBlockEnd: 1, scrollPaddingBlockStart: 1, scrollPaddingBottom: 1, scrollPaddingInline: 1, scrollPaddingInlineEnd: 1, scrollPaddingInlineStart: 1, scrollPaddingLeft: 1, scrollPaddingRight: 1, scrollPaddingTop: 1, shapeMargin: 1, textDecoration: 1, textDecorationThickness: 1, textIndent: 1, textUnderlineOffset: 1, top: 1, transitionDelay: 1, transitionDuration: 1, verticalAlign: 1, width: 1, wordSpacing: 1 };
    z = (e2) => String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
    W = (e2) => ((e3) => {
      let t2, n2 = "";
      for (t2 = Math.abs(e3); t2 > 52; t2 = t2 / 52 | 0)
        n2 = z(t2 % 52) + n2;
      return z(t2 % 52) + n2;
    })(((e3, t2) => {
      let n2 = t2.length;
      for (; n2; )
        e3 = 33 * e3 ^ t2.charCodeAt(--n2);
      return e3;
    })(5381, JSON.stringify(e2)) >>> 0);
    j = ["themed", "global", "styled", "onevar", "resonevar", "allvar", "inline"];
    E = (e2) => {
      if (e2.href && !e2.href.startsWith(location.origin))
        return false;
      try {
        return !!e2.cssRules;
      } catch (e3) {
        return false;
      }
    };
    T = (e2) => {
      let t2;
      const n2 = () => {
        const { cssRules: e3 } = t2.sheet;
        return [].map.call(e3, (n3, r3) => {
          const { cssText: i2 } = n3;
          let o2 = "";
          if (i2.startsWith("--sxs"))
            return "";
          if (e3[r3 - 1] && (o2 = e3[r3 - 1].cssText).startsWith("--sxs")) {
            if (!n3.cssRules.length)
              return "";
            for (const e4 in t2.rules)
              if (t2.rules[e4].group === n3)
                return `--sxs{--sxs:${[...t2.rules[e4].cache].join(" ")}}${i2}`;
            return n3.cssRules.length ? `${o2}${i2}` : "";
          }
          return i2;
        }).join("");
      }, r2 = () => {
        if (t2) {
          const { rules: e3, sheet: n3 } = t2;
          if (!n3.deleteRule) {
            for (; 3 === Object(Object(n3.cssRules)[0]).type; )
              n3.cssRules.splice(0, 1);
            n3.cssRules = [];
          }
          for (const t3 in e3)
            delete e3[t3];
        }
        const i2 = Object(e2).styleSheets || [];
        for (const e3 of i2)
          if (E(e3)) {
            for (let i3 = 0, o3 = e3.cssRules; o3[i3]; ++i3) {
              const l3 = Object(o3[i3]);
              if (1 !== l3.type)
                continue;
              const s22 = Object(o3[i3 + 1]);
              if (4 !== s22.type)
                continue;
              ++i3;
              const { cssText: a2 } = l3;
              if (!a2.startsWith("--sxs"))
                continue;
              const c2 = a2.slice(14, -3).trim().split(/\s+/), d2 = j[c2[0]];
              d2 && (t2 || (t2 = { sheet: e3, reset: r2, rules: {}, toString: n2 }), t2.rules[d2] = { group: s22, index: i3, cache: new Set(c2) });
            }
            if (t2)
              break;
          }
        if (!t2) {
          const i3 = (e3, t3) => ({ type: t3, cssRules: [], insertRule(e4, t4) {
            this.cssRules.splice(t4, 0, i3(e4, { import: 3, undefined: 1 }[(e4.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
          }, get cssText() {
            return "@media{}" === e3 ? `@media{${[].map.call(this.cssRules, (e4) => e4.cssText).join("")}}` : e3;
          } });
          t2 = { sheet: e2 ? (e2.head || e2).appendChild(document.createElement("style")).sheet : i3("", "text/css"), rules: {}, reset: r2, toString: n2 };
        }
        const { sheet: o2, rules: l2 } = t2;
        for (let e3 = j.length - 1; e3 >= 0; --e3) {
          const t3 = j[e3];
          if (!l2[t3]) {
            const n3 = j[e3 + 1], r3 = l2[n3] ? l2[n3].index : o2.cssRules.length;
            o2.insertRule("@media{}", r3), o2.insertRule(`--sxs{--sxs:${e3}}`, r3), l2[t3] = { group: o2.cssRules[r3 + 1], index: r3, cache: /* @__PURE__ */ new Set([e3]) };
          }
          v(l2[t3]);
        }
      };
      return r2(), t2;
    };
    v = (e2) => {
      const t2 = e2.group;
      let n2 = t2.cssRules.length;
      e2.apply = (e3) => {
        try {
          t2.insertRule(e3, n2), ++n2;
        } catch (e4) {
        }
      };
    };
    M = Symbol();
    w = l();
    C = (e2, t2) => w(e2, () => (...n2) => {
      let r2 = { type: null, composers: /* @__PURE__ */ new Set() };
      for (const t3 of n2)
        if (null != t3)
          if (t3[s2]) {
            null == r2.type && (r2.type = t3[s2].type);
            for (const e3 of t3[s2].composers)
              r2.composers.add(e3);
          } else
            t3.constructor !== Object || t3.$$typeof ? null == r2.type && (r2.type = t3) : r2.composers.add(P(t3, e2));
      return null == r2.type && (r2.type = "span"), r2.composers.size || r2.composers.add(["PJLV", {}, [], [], {}, []]), L(e2, r2, t2);
    });
    P = ({ variants: e2, compoundVariants: t2, defaultVariants: n2, ...r2 }, i2) => {
      const o2 = `${k(i2.prefix)}c-${W(r2)}`, l2 = [], s22 = [], a2 = /* @__PURE__ */ Object.create(null), g2 = [];
      for (const e3 in n2)
        a2[e3] = String(n2[e3]);
      if ("object" == typeof e2 && e2)
        for (const t3 in e2) {
          p2 = a2, u2 = t3, d.call(p2, u2) || (a2[t3] = "undefined");
          const n3 = e2[t3];
          for (const e3 in n3) {
            const r3 = { [t3]: String(e3) };
            "undefined" === String(e3) && g2.push(t3);
            const i3 = n3[e3], o3 = [r3, i3, !c(i3)];
            l2.push(o3);
          }
        }
      var p2, u2;
      if ("object" == typeof t2 && t2)
        for (const e3 of t2) {
          let { css: t3, ...n3 } = e3;
          t3 = "object" == typeof t3 && t3 || {};
          for (const e4 in n3)
            n3[e4] = String(n3[e4]);
          const r3 = [n3, t3, !c(t3)];
          s22.push(r3);
        }
      return [o2, r2, l2, s22, a2, g2];
    };
    L = (e2, t2, n2) => {
      const [r2, i2, o2, l2] = O(t2.composers), c2 = "function" == typeof t2.type || t2.type.$$typeof ? ((e3) => {
        function t3() {
          for (let n3 = 0; n3 < t3[M].length; n3++) {
            const [r3, i3] = t3[M][n3];
            e3.rules[r3].apply(i3);
          }
          return t3[M] = [], null;
        }
        return t3[M] = [], t3.rules = {}, j.forEach((e4) => t3.rules[e4] = { apply: (n3) => t3[M].push([e4, n3]) }), t3;
      })(n2) : null, d2 = (c2 || n2).rules, g2 = `.${r2}${i2.length > 1 ? `:where(.${i2.slice(1).join(".")})` : ""}`, p2 = (s22) => {
        s22 = "object" == typeof s22 && s22 || D;
        const { css: a2, ...p3 } = s22, u2 = {};
        for (const e3 in o2)
          if (delete p3[e3], e3 in s22) {
            let t3 = s22[e3];
            "object" == typeof t3 && t3 ? u2[e3] = { "@initial": o2[e3], ...t3 } : (t3 = String(t3), u2[e3] = "undefined" !== t3 || l2.has(e3) ? t3 : o2[e3]);
          } else
            u2[e3] = o2[e3];
        const h2 = /* @__PURE__ */ new Set([...i2]);
        for (const [r3, i3, o3, l3] of t2.composers) {
          n2.rules.styled.cache.has(r3) || (n2.rules.styled.cache.add(r3), x(i3, [`.${r3}`], [], e2, (e3) => {
            d2.styled.apply(e3);
          }));
          const t3 = A(o3, u2, e2.media), s3 = A(l3, u2, e2.media, true);
          for (const i4 of t3)
            if (void 0 !== i4)
              for (const [t4, o4, l4] of i4) {
                const i5 = `${r3}-${W(o4)}-${t4}`;
                h2.add(i5);
                const s4 = (l4 ? n2.rules.resonevar : n2.rules.onevar).cache, a3 = l4 ? d2.resonevar : d2.onevar;
                s4.has(i5) || (s4.add(i5), x(o4, [`.${i5}`], [], e2, (e3) => {
                  a3.apply(e3);
                }));
              }
          for (const t4 of s3)
            if (void 0 !== t4)
              for (const [i4, o4] of t4) {
                const t5 = `${r3}-${W(o4)}-${i4}`;
                h2.add(t5), n2.rules.allvar.cache.has(t5) || (n2.rules.allvar.cache.add(t5), x(o4, [`.${t5}`], [], e2, (e3) => {
                  d2.allvar.apply(e3);
                }));
              }
        }
        if ("object" == typeof a2 && a2) {
          const t3 = `${r2}-i${W(a2)}-css`;
          h2.add(t3), n2.rules.inline.cache.has(t3) || (n2.rules.inline.cache.add(t3), x(a2, [`.${t3}`], [], e2, (e3) => {
            d2.inline.apply(e3);
          }));
        }
        for (const e3 of String(s22.className || "").trim().split(/\s+/))
          e3 && h2.add(e3);
        const f2 = p3.className = [...h2].join(" ");
        return { type: t2.type, className: f2, selector: g2, props: p3, toString: () => f2, deferredInjector: c2 };
      };
      return a(p2, { className: r2, selector: g2, [s2]: t2, toString: () => (n2.rules.styled.cache.has(r2) || p2(), r2) });
    };
    O = (e2) => {
      let t2 = "";
      const n2 = [], r2 = {}, i2 = [];
      for (const [o2, , , , l2, s22] of e2) {
        "" === t2 && (t2 = o2), n2.push(o2), i2.push(...s22);
        for (const e3 in l2) {
          const t3 = l2[e3];
          (void 0 === r2[e3] || "undefined" !== t3 || s22.includes(t3)) && (r2[e3] = t3);
        }
      }
      return [t2, n2, r2, new Set(i2)];
    };
    A = (e2, t2, n2, r2) => {
      const i2 = [];
      e:
        for (let [o2, l2, s22] of e2) {
          if (s22)
            continue;
          let e3, a2 = 0, c2 = false;
          for (e3 in o2) {
            const r3 = o2[e3];
            let i3 = t2[e3];
            if (i3 !== r3) {
              if ("object" != typeof i3 || !i3)
                continue e;
              {
                let e4, t3, o3 = 0;
                for (const l3 in i3) {
                  if (r3 === String(i3[l3])) {
                    if ("@initial" !== l3) {
                      const e5 = l3.slice(1);
                      (t3 = t3 || []).push(e5 in n2 ? n2[e5] : l3.replace(/^@media ?/, "")), c2 = true;
                    }
                    a2 += o3, e4 = true;
                  }
                  ++o3;
                }
                if (t3 && t3.length && (l2 = { ["@media " + t3.join(", ")]: l2 }), !e4)
                  continue e;
              }
            }
          }
          (i2[a2] = i2[a2] || []).push([r2 ? "cv" : `${e3}-${o2[e3]}`, l2, c2]);
        }
      return i2;
    };
    D = {};
    H = l();
    N = (e2, t2) => H(e2, () => (...n2) => {
      const r2 = () => {
        for (let r3 of n2) {
          r3 = "object" == typeof r3 && r3 || {};
          let n3 = W(r3);
          if (!t2.rules.global.cache.has(n3)) {
            if (t2.rules.global.cache.add(n3), "@import" in r3) {
              let e3 = [].indexOf.call(t2.sheet.cssRules, t2.rules.themed.group) - 1;
              for (let n4 of [].concat(r3["@import"]))
                n4 = n4.includes('"') || n4.includes("'") ? n4 : `"${n4}"`, t2.sheet.insertRule(`@import ${n4};`, e3++);
              delete r3["@import"];
            }
            x(r3, [], [], e2, (e3) => {
              t2.rules.global.apply(e3);
            });
          }
        }
        return "";
      };
      return a(r2, { toString: r2 });
    });
    V = l();
    G = (e2, t2) => V(e2, () => (n2) => {
      const r2 = `${k(e2.prefix)}k-${W(n2)}`, i2 = () => {
        if (!t2.rules.global.cache.has(r2)) {
          t2.rules.global.cache.add(r2);
          const i3 = [];
          x(n2, [], [], e2, (e3) => i3.push(e3));
          const o2 = `@keyframes ${r2}{${i3.join("")}}`;
          t2.rules.global.apply(o2);
        }
        return r2;
      };
      return a(i2, { get name() {
        return i2();
      }, toString: i2 });
    });
    F = class {
      constructor(e2, t2, n2, r2) {
        this.token = null == e2 ? "" : String(e2), this.value = null == t2 ? "" : String(t2), this.scale = null == n2 ? "" : String(n2), this.prefix = null == r2 ? "" : String(r2);
      }
      get computedValue() {
        return "var(" + this.variable + ")";
      }
      get variable() {
        return "--" + k(this.prefix) + k(this.scale) + this.token;
      }
      toString() {
        return this.computedValue;
      }
    };
    J = l();
    U = (e2, t2) => J(e2, () => (n2, r2) => {
      r2 = "object" == typeof n2 && n2 || Object(r2);
      const i2 = `.${n2 = (n2 = "string" == typeof n2 ? n2 : "") || `${k(e2.prefix)}t-${W(r2)}`}`, o2 = {}, l2 = [];
      for (const t3 in r2) {
        o2[t3] = {};
        for (const n3 in r2[t3]) {
          const i3 = `--${k(e2.prefix)}${t3}-${n3}`, s3 = y(String(r2[t3][n3]), e2.prefix, t3);
          o2[t3][n3] = new F(n3, s3, t3, e2.prefix), l2.push(`${i3}:${s3}`);
        }
      }
      const s22 = () => {
        if (l2.length && !t2.rules.themed.cache.has(n2)) {
          t2.rules.themed.cache.add(n2);
          const i3 = `${r2 === e2.theme ? ":root," : ""}.${n2}{${l2.join(";")}}`;
          t2.rules.themed.apply(i3);
        }
        return n2;
      };
      return { ...o2, get className() {
        return s22();
      }, selector: i2, toString: s22 };
    });
    Z = l();
    X = (e2) => {
      let t2 = false;
      const n2 = Z(e2, (e3) => {
        t2 = true;
        const n3 = "prefix" in (e3 = "object" == typeof e3 && e3 || {}) ? String(e3.prefix) : "", r2 = "object" == typeof e3.media && e3.media || {}, o2 = "object" == typeof e3.root ? e3.root || null : globalThis.document || null, l2 = "object" == typeof e3.theme && e3.theme || {}, s22 = { prefix: n3, media: r2, theme: l2, themeMap: "object" == typeof e3.themeMap && e3.themeMap || { ...i }, utils: "object" == typeof e3.utils && e3.utils || {} }, a2 = T(o2), c2 = { css: C(s22, a2), globalCss: N(s22, a2), keyframes: G(s22, a2), createTheme: U(s22, a2), reset() {
          a2.reset(), c2.theme.toString();
        }, theme: {}, sheet: a2, config: s22, prefix: n3, getCssText: a2.toString, toString: a2.toString };
        return String(c2.theme = c2.createTheme(l2)), c2;
      });
      return t2 || n2.reset(), n2;
    };
    Y = () => e || (e = X());
    q = (...e2) => Y().createTheme(...e2);
    _ = (...e2) => Y().css(...e2);
    Anchor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classNames;
      let $$restProps = compute_rest_props($$props, ["href", "appearance"]);
      const anchorHTMLAttributes = _({
        fontFamily: "$bodyFontFamily",
        fontSize: "$baseBodySize",
        marginBottom: "$anchorBottomMargin",
        color: "$anchorTextColor",
        display: "block",
        textAlign: "center",
        textDecoration: "underline",
        "&:hover": { color: "$anchorTextHoverColor" }
      });
      let { href } = $$props;
      let { appearance = {} } = $$props;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      classNames = generateClassNames("anchor", anchorHTMLAttributes(), appearance);
      return `<a${spread(
        [
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            style: escape_attribute_value(appearance?.style?.anchor)
          },
          {
            class: escape_attribute_value(classNames.join(" "))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a>`;
    });
    css$6 = {
      code: "button.svelte-ll2s9h{display:flex;align-items:center;justify-content:center;gap:8px;border-radius:var(--radii-borderRadiusButton);font-size:var(--fontSizes-baseButtonSize);padding:var(--space-buttonPadding);cursor:pointer;border-width:var(--borderWidths-buttonBorderWidth);border-style:solid;width:100%;transition-property:background-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:100ms}button.default.svelte-ll2s9h{background-color:var(--colors-defaultButtonBackground);color:var(--colors-defaultButtonText);border-color:var(--colors-defaultButtonBorder)}button.default.svelte-ll2s9h:hover{background-color:var(--colors-defaultButtonBackgroundHover)}button.primary.svelte-ll2s9h{background-color:var(--colors-brand);color:var(--colors-brandButtonText);border-color:var(--colors-brandAccent)}button.primary.svelte-ll2s9h:hover{background-color:var(--colors-brandAccent)}",
      map: null
    };
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classNames;
      let $$restProps = compute_rest_props($$props, ["color", "appearance", "loading"]);
      let { color = "default" } = $$props;
      let { appearance = {} } = $$props;
      let { loading = false } = $$props;
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
        $$bindings.loading(loading);
      $$result.css.add(css$6);
      classNames = generateClassNames("button", color, appearance);
      return `<button${spread(
        [
          escape_object($$restProps),
          { disabled: loading || null },
          {
            style: escape_attribute_value(appearance?.style?.button)
          },
          {
            class: escape_attribute_value(classNames.join(" "))
          }
        ],
        { classes: "svelte-ll2s9h" }
      )}>${slots.default ? slots.default({}) : ``}
</button>`;
    });
    Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classNames;
      let $$restProps = compute_rest_props($$props, ["direction", "gap", "appearance"]);
      const containerDefaultStyles = _({
        display: "flex",
        gap: "4px",
        variants: {
          direction: {
            horizontal: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))"
            },
            vertical: { flexDirection: "column", margin: "8px 0" }
          },
          gap: {
            small: { gap: "4px" },
            medium: { gap: "8px" },
            large: { gap: "16px" }
          }
        }
      });
      let { direction = "horizontal" } = $$props;
      let { gap = "small" } = $$props;
      let { appearance = {} } = $$props;
      if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
        $$bindings.direction(direction);
      if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
        $$bindings.gap(gap);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      classNames = generateClassNames("container", containerDefaultStyles({ direction, gap }), appearance);
      return `<div${spread(
        [
          escape_object($$restProps),
          {
            style: escape_attribute_value(appearance?.style?.container)
          },
          {
            class: escape_attribute_value(classNames.join(" "))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</div>`;
    });
    Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classNames;
      let $$restProps = compute_rest_props($$props, ["value", "appearance"]);
      const inputDefaultStyles = _({
        fontFamily: "$inputFontFamily",
        background: "$inputBackground",
        borderRadius: "$inputBorderRadius",
        padding: "$inputPadding",
        cursor: "text",
        borderWidth: "$inputBorderWidth",
        borderColor: "$inputBorder",
        borderStyle: "solid",
        fontSize: "$baseInputSize",
        width: "100%",
        color: "$inputText",
        boxSizing: "border-box",
        "&:hover": {
          borderColor: "$inputBorderHover",
          outline: "none"
        },
        "&:focus": {
          borderColor: "$inputBorderFocus",
          outline: "none"
        },
        "&::placeholder": {
          color: "$inputPlaceholder",
          letterSpacing: "initial"
        },
        transitionPproperty: "background-color, border",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "100ms",
        variants: {
          type: {
            default: { letterSpacing: "0px" },
            password: { letterSpacing: "6px" }
          }
        }
      });
      let { value: value2 = void 0 } = $$props;
      let { appearance = {} } = $$props;
      if ($$props.value === void 0 && $$bindings.value && value2 !== void 0)
        $$bindings.value(value2);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      classNames = generateClassNames("input", inputDefaultStyles({ type: "default" }), appearance);
      return `<input${spread(
        [
          escape_object($$restProps),
          {
            style: escape_attribute_value(appearance?.style?.input)
          },
          {
            class: escape_attribute_value(classNames.join(" "))
          }
        ],
        {}
      )}${add_attribute("value", value2, 0)}>`;
    });
    Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classNames;
      let $$restProps = compute_rest_props($$props, ["appearance"]);
      const labelDefaultStyles = _({
        fontFamily: "$labelFontFamily",
        fontSize: "$baseLabelSize",
        marginBottom: "$labelBottomMargin",
        color: "$inputLabelText",
        display: "block"
      });
      let { appearance = {} } = $$props;
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      classNames = generateClassNames("label", labelDefaultStyles(), appearance);
      return `<label${spread(
        [
          escape_object($$restProps),
          {
            style: escape_attribute_value(appearance?.style?.label)
          },
          {
            class: escape_attribute_value(classNames.join(" "))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</label>`;
    });
    css$5 = {
      code: "form.svelte-nm5p4o{width:100%}",
      map: null
    };
    EmailAuth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { authView = "sign_in" } = $$props;
      let { email = "" } = $$props;
      let { password = "" } = $$props;
      let { supabaseClient } = $$props;
      let { redirectTo = void 0 } = $$props;
      let { additionalData = void 0 } = $$props;
      let { showLinks = false } = $$props;
      let { magicLink = true } = $$props;
      let { i18n } = $$props;
      let { appearance } = $$props;
      let loading = false;
      let lngKey = authView === "sign_in" ? "sign_in" : "sign_up";
      if ($$props.authView === void 0 && $$bindings.authView && authView !== void 0)
        $$bindings.authView(authView);
      if ($$props.email === void 0 && $$bindings.email && email !== void 0)
        $$bindings.email(email);
      if ($$props.password === void 0 && $$bindings.password && password !== void 0)
        $$bindings.password(password);
      if ($$props.supabaseClient === void 0 && $$bindings.supabaseClient && supabaseClient !== void 0)
        $$bindings.supabaseClient(supabaseClient);
      if ($$props.redirectTo === void 0 && $$bindings.redirectTo && redirectTo !== void 0)
        $$bindings.redirectTo(redirectTo);
      if ($$props.additionalData === void 0 && $$bindings.additionalData && additionalData !== void 0)
        $$bindings.additionalData(additionalData);
      if ($$props.showLinks === void 0 && $$bindings.showLinks && showLinks !== void 0)
        $$bindings.showLinks(showLinks);
      if ($$props.magicLink === void 0 && $$bindings.magicLink && magicLink !== void 0)
        $$bindings.magicLink(magicLink);
      if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
        $$bindings.i18n(i18n);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      $$result.css.add(css$5);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<form method="post" class="svelte-nm5p4o">${validate_component(Container, "Container").$$render(
          $$result,
          {
            direction: "vertical",
            gap: "large",
            appearance
          },
          {},
          {
            default: () => {
              return `${validate_component(Container, "Container").$$render(
                $$result,
                {
                  direction: "vertical",
                  gap: "large",
                  appearance
                },
                {},
                {
                  default: () => {
                    return `<div>${validate_component(Label, "Label").$$render($$result, { for: "email", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.[lngKey]?.email_label)}`;
                      }
                    })}
				${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "email",
                        type: "email",
                        name: "email",
                        autofocus: true,
                        placeholder: i18n?.[lngKey]?.email_input_placeholder,
                        autocomplete: "email",
                        appearance,
                        value: email
                      },
                      {
                        value: ($$value) => {
                          email = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}</div>
			<div>${validate_component(Label, "Label").$$render($$result, { for: "password", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.[lngKey]?.password_label)}`;
                      }
                    })}
				${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "password",
                        type: "password",
                        name: "password",
                        placeholder: i18n?.[lngKey]?.password_input_placeholder,
                        autocomplete: authView === VIEWS.SIGN_IN ? "current-password" : "new-password",
                        appearance,
                        value: password
                      },
                      {
                        value: ($$value) => {
                          password = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}</div>
			${slots.default ? slots.default({}) : ``}`;
                  }
                }
              )}
		${validate_component(Button, "Button").$$render(
                $$result,
                {
                  type: "submit",
                  color: "primary",
                  loading,
                  appearance
                },
                {},
                {
                  default: () => {
                    return `${escape(i18n?.[lngKey]?.button_label)}`;
                  }
                }
              )}

		${showLinks ? `${validate_component(Container, "Container").$$render(
                $$result,
                {
                  direction: "vertical",
                  gap: "small",
                  appearance
                },
                {},
                {
                  default: () => {
                    return `${authView === VIEWS.SIGN_IN && magicLink ? `${validate_component(Anchor, "Anchor").$$render($$result, { href: "#auth-magic-link", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.magic_link?.link_text)}`;
                      }
                    })}` : ``}
				${authView === VIEWS.SIGN_IN ? `${validate_component(Anchor, "Anchor").$$render(
                      $$result,
                      {
                        href: "#auth-forgot-password",
                        appearance
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(i18n?.forgotten_password?.link_text)}`;
                        }
                      }
                    )}
					${validate_component(Anchor, "Anchor").$$render($$result, { href: "#auth-sign-up", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.sign_up?.link_text)}`;
                      }
                    })}` : `${validate_component(Anchor, "Anchor").$$render($$result, { href: "#auth-sign-in", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.sign_in?.link_text)}`;
                      }
                    })}`}`;
                  }
                }
              )}` : ``}`;
            }
          }
        )}

	${``}
	${``}
</form>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$4 = {
      code: "form.svelte-nm5p4o{width:100%}",
      map: null
    };
    ForgottenPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { i18n } = $$props;
      let { supabaseClient } = $$props;
      let { authView } = $$props;
      let { redirectTo = void 0 } = $$props;
      let { email = "" } = $$props;
      let { showLinks = false } = $$props;
      let { appearance } = $$props;
      let loading = false;
      if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
        $$bindings.i18n(i18n);
      if ($$props.supabaseClient === void 0 && $$bindings.supabaseClient && supabaseClient !== void 0)
        $$bindings.supabaseClient(supabaseClient);
      if ($$props.authView === void 0 && $$bindings.authView && authView !== void 0)
        $$bindings.authView(authView);
      if ($$props.redirectTo === void 0 && $$bindings.redirectTo && redirectTo !== void 0)
        $$bindings.redirectTo(redirectTo);
      if ($$props.email === void 0 && $$bindings.email && email !== void 0)
        $$bindings.email(email);
      if ($$props.showLinks === void 0 && $$bindings.showLinks && showLinks !== void 0)
        $$bindings.showLinks(showLinks);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      $$result.css.add(css$4);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<form id="auth-forgot-password" method="post" class="svelte-nm5p4o">${validate_component(Container, "Container").$$render(
          $$result,
          {
            direction: "vertical",
            gap: "large",
            appearance
          },
          {},
          {
            default: () => {
              return `${validate_component(Container, "Container").$$render(
                $$result,
                {
                  direction: "vertical",
                  gap: "large",
                  appearance
                },
                {},
                {
                  default: () => {
                    return `<div>${validate_component(Label, "Label").$$render($$result, { for: "email", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.forgotten_password?.email_label)}`;
                      }
                    })}
				${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "email",
                        type: "email",
                        name: "email",
                        autofocus: true,
                        placeholder: i18n?.forgotten_password?.email_input_placeholder,
                        autocomplete: "email",
                        appearance,
                        value: email
                      },
                      {
                        value: ($$value) => {
                          email = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}</div>
			${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        type: "submit",
                        color: "primary",
                        loading,
                        appearance
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(i18n?.forgotten_password?.button_label)}`;
                        }
                      }
                    )}`;
                  }
                }
              )}

		${showLinks ? `${validate_component(Anchor, "Anchor").$$render($$result, { href: "#auth-magic-link", appearance }, {}, {
                default: () => {
                  return `${escape(i18n?.sign_in?.link_text)}`;
                }
              })}` : ``}
		${``}
		${``}`;
            }
          }
        )}
</form>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$3 = {
      code: "form.svelte-nm5p4o{width:100%}",
      map: null
    };
    MagicLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { i18n } = $$props;
      let { supabaseClient } = $$props;
      let { authView } = $$props;
      let { redirectTo = void 0 } = $$props;
      let { appearance } = $$props;
      let { showLinks = false } = $$props;
      let { email = "" } = $$props;
      let loading = false;
      if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
        $$bindings.i18n(i18n);
      if ($$props.supabaseClient === void 0 && $$bindings.supabaseClient && supabaseClient !== void 0)
        $$bindings.supabaseClient(supabaseClient);
      if ($$props.authView === void 0 && $$bindings.authView && authView !== void 0)
        $$bindings.authView(authView);
      if ($$props.redirectTo === void 0 && $$bindings.redirectTo && redirectTo !== void 0)
        $$bindings.redirectTo(redirectTo);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      if ($$props.showLinks === void 0 && $$bindings.showLinks && showLinks !== void 0)
        $$bindings.showLinks(showLinks);
      if ($$props.email === void 0 && $$bindings.email && email !== void 0)
        $$bindings.email(email);
      $$result.css.add(css$3);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<form id="auth-magic-link" method="post" class="svelte-nm5p4o">${validate_component(Container, "Container").$$render(
          $$result,
          {
            direction: "vertical",
            gap: "large",
            appearance
          },
          {},
          {
            default: () => {
              return `${validate_component(Container, "Container").$$render(
                $$result,
                {
                  direction: "vertical",
                  gap: "large",
                  appearance
                },
                {},
                {
                  default: () => {
                    return `<div>${validate_component(Label, "Label").$$render($$result, { for: "email", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.magic_link?.email_input_label)}`;
                      }
                    })}
				${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "email",
                        type: "email",
                        name: "email",
                        autofocus: true,
                        placeholder: i18n?.magic_link?.email_input_placeholder,
                        autocomplete: "email",
                        appearance,
                        value: email
                      },
                      {
                        value: ($$value) => {
                          email = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}</div>
			${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        type: "submit",
                        color: "primary",
                        loading,
                        appearance
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(i18n?.magic_link?.button_label)}`;
                        }
                      }
                    )}`;
                  }
                }
              )}

		${showLinks ? `${validate_component(Anchor, "Anchor").$$render($$result, { href: "#auth-sign-in", appearance }, {}, {
                default: () => {
                  return `${escape(i18n?.sign_in?.link_text)}`;
                }
              })}` : ``}
		${``}
		${``}`;
            }
          }
        )}
</form>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$2 = {
      code: "svg.svelte-10a6av0{height:21px;width:21px}",
      map: null
    };
    Icons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { provider } = $$props;
      if ($$props.provider === void 0 && $$bindings.provider && provider !== void 0)
        $$bindings.provider(provider);
      $$result.css.add(css$2);
      return `${provider === "google" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>` : `${provider === "facebook" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path></svg>` : `${provider === "twitter" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path></svg>` : `${provider === "apple" ? `<svg fill="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21px" height="21px" class="svelte-10a6av0">${escape(" ")}<path d="M 15.904297 1.078125 C 15.843359 1.06875 15.774219 1.0746094 15.699219 1.0996094 C 14.699219 1.2996094 13.600391 1.8996094 12.900391 2.5996094 C 12.300391 3.1996094 11.800781 4.1996094 11.800781 5.0996094 C 11.800781 5.2996094 11.999219 5.5 12.199219 5.5 C 13.299219 5.4 14.399609 4.7996094 15.099609 4.0996094 C 15.699609 3.2996094 16.199219 2.4 16.199219 1.5 C 16.199219 1.275 16.087109 1.10625 15.904297 1.078125 z M 16.199219 5.4003906 C 14.399219 5.4003906 13.600391 6.5 12.400391 6.5 C 11.100391 6.5 9.9003906 5.5 8.4003906 5.5 C 6.3003906 5.5 3.0996094 7.4996094 3.0996094 12.099609 C 2.9996094 16.299609 6.8 21 9 21 C 10.3 21 10.600391 20.199219 12.400391 20.199219 C 14.200391 20.199219 14.600391 21 15.900391 21 C 17.400391 21 18.500391 19.399609 19.400391 18.099609 C 19.800391 17.399609 20.100391 17.000391 20.400391 16.400391 C 20.600391 16.000391 20.4 15.600391 20 15.400391 C 17.4 14.100391 16.900781 9.9003906 19.800781 8.4003906 C 20.300781 8.1003906 20.4 7.4992188 20 7.1992188 C 18.9 6.1992187 17.299219 5.4003906 16.199219 5.4003906 z"></path></svg>` : `${provider === "github" ? `<svg fill="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="21px" height="21px" class="svelte-10a6av0">${escape(" ")}<path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path></svg>` : `${provider === "gitlab" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><path fill="#e53935" d="M24 43L16 20 32 20z"></path><path fill="#ff7043" d="M24 43L42 20 32 20z"></path><path fill="#e53935" d="M37 5L42 20 32 20z"></path><path fill="#ffa726" d="M24 43L42 20 45 28z"></path><path fill="#ff7043" d="M24 43L6 20 16 20z"></path><path fill="#e53935" d="M11 5L6 20 16 20z"></path><path fill="#ffa726" d="M24 43L6 20 3 28z"></path></svg>` : `${provider === "bitbucket" ? `<svg xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 62.42 62.42" class="svelte-10a6av0"><defs><linearGradient id="New_Gradient_Swatch_1" x1="64.01" y1="30.27" x2="32.99" y2="54.48" gradientUnits="userSpaceOnUse"><stop offset="0.18" stop-color="#0052cc"></stop><stop offset="1" stop-color="#2684ff"></stop></linearGradient></defs><title>Bitbucket-blue</title><g id="Layer_2" data-name="Layer 2"><g id="Blue" transform="translate(0 -3.13)"><path d="M2,6.26A2,2,0,0,0,0,8.58L8.49,60.12a2.72,2.72,0,0,0,2.66,2.27H51.88a2,2,0,0,0,2-1.68L62.37,8.59a2,2,0,0,0-2-2.32ZM37.75,43.51h-13L21.23,25.12H40.9Z" fill="#2684ff"></path><path d="M59.67,25.12H40.9L37.75,43.51h-13L9.4,61.73a2.71,2.71,0,0,0,1.75.66H51.89a2,2,0,0,0,2-1.68Z" fill="url(#New_Gradient_Swatch_1)"></path></g></g></svg>` : `${provider === "discord" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><path fill="#536dfe" d="M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778c-0.057-0.01-0.114,0.016-0.144,0.068	c-0.387,0.688-0.815,1.585-1.115,2.291c-3.382-0.506-6.747-0.506-10.059,0c-0.3-0.721-0.744-1.603-1.133-2.291	c-0.03-0.051-0.087-0.077-0.144-0.068c-3.143,0.541-6.15,1.489-8.956,2.778c-0.024,0.01-0.045,0.028-0.059,0.051	c-5.704,8.522-7.267,16.835-6.5,25.044c0.003,0.04,0.026,0.079,0.057,0.103c3.763,2.764,7.409,4.442,10.987,5.554	c0.057,0.017,0.118-0.003,0.154-0.051c0.846-1.156,1.601-2.374,2.248-3.656c0.038-0.075,0.002-0.164-0.076-0.194	c-1.197-0.454-2.336-1.007-3.432-1.636c-0.087-0.051-0.094-0.175-0.014-0.234c0.231-0.173,0.461-0.353,0.682-0.534	c0.04-0.033,0.095-0.04,0.142-0.019c7.201,3.288,14.997,3.288,22.113,0c0.047-0.023,0.102-0.016,0.144,0.017	c0.22,0.182,0.451,0.363,0.683,0.536c0.08,0.059,0.075,0.183-0.012,0.234c-1.096,0.641-2.236,1.182-3.434,1.634	c-0.078,0.03-0.113,0.12-0.075,0.196c0.661,1.28,1.415,2.498,2.246,3.654c0.035,0.049,0.097,0.07,0.154,0.052	c3.595-1.112,7.241-2.79,11.004-5.554c0.033-0.024,0.054-0.061,0.057-0.101c0.917-9.491-1.537-17.735-6.505-25.044	C39.293,10.205,39.272,10.187,39.248,10.177z M16.703,30.273c-2.168,0-3.954-1.99-3.954-4.435s1.752-4.435,3.954-4.435	c2.22,0,3.989,2.008,3.954,4.435C20.658,28.282,18.906,30.273,16.703,30.273z M31.324,30.273c-2.168,0-3.954-1.99-3.954-4.435	s1.752-4.435,3.954-4.435c2.22,0,3.989,2.008,3.954,4.435C35.278,28.282,33.544,30.273,31.324,30.273z"></path></svg>` : `${provider === "azure" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><linearGradient id="k8yl7~hDat~FaoWq8WjN6a" x1="-1254.397" x2="-1261.911" y1="877.268" y2="899.466" gradientTransform="translate(1981.75 -1362.063) scale(1.5625)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#114a8b"></stop><stop offset="1" stop-color="#0669bc"></stop></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6a)" d="M17.634,6h11.305L17.203,40.773c-0.247,0.733-0.934,1.226-1.708,1.226H6.697 c-0.994,0-1.8-0.806-1.8-1.8c0-0.196,0.032-0.39,0.094-0.576L15.926,7.227C16.173,6.494,16.86,6,17.634,6L17.634,6z"></path><path fill="#0078d4" d="M34.062,29.324H16.135c-0.458-0.001-0.83,0.371-0.831,0.829c0,0.231,0.095,0.451,0.264,0.608 l11.52,10.752C27.423,41.826,27.865,42,28.324,42h10.151L34.062,29.324z"></path><linearGradient id="k8yl7~hDat~FaoWq8WjN6b" x1="-1252.05" x2="-1253.788" y1="887.612" y2="888.2" gradientTransform="translate(1981.75 -1362.063) scale(1.5625)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".3"></stop><stop offset=".071" stop-opacity=".2"></stop><stop offset=".321" stop-opacity=".1"></stop><stop offset=".623" stop-opacity=".05"></stop><stop offset="1" stop-opacity="0"></stop></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6b)" d="M17.634,6c-0.783-0.003-1.476,0.504-1.712,1.25L5.005,39.595 c-0.335,0.934,0.151,1.964,1.085,2.299C6.286,41.964,6.493,42,6.702,42h9.026c0.684-0.122,1.25-0.603,1.481-1.259l2.177-6.416 l7.776,7.253c0.326,0.27,0.735,0.419,1.158,0.422h10.114l-4.436-12.676l-12.931,0.003L28.98,6H17.634z"></path><linearGradient id="k8yl7~hDat~FaoWq8WjN6c" x1="-1252.952" x2="-1244.704" y1="876.6" y2="898.575" gradientTransform="translate(1981.75 -1362.063) scale(1.5625)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3ccbf4"></stop><stop offset="1" stop-color="#2892df"></stop></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6c)" d="M32.074,7.225C31.827,6.493,31.141,6,30.368,6h-12.6c0.772,0,1.459,0.493,1.705,1.224 l10.935,32.399c0.318,0.942-0.188,1.963-1.13,2.281C29.093,41.968,28.899,42,28.703,42h12.6c0.994,0,1.8-0.806,1.8-1.801 c0-0.196-0.032-0.39-0.095-0.575L32.074,7.225z"></path></svg>` : `${provider === "keycloak" ? `<svg width="21px" height="21px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-10a6av0"><path d="M472.136 163.959H408.584C407.401 163.959 406.218 163.327 405.666 162.3L354.651 73.6591C354.02 72.632 352.916 72 351.654 72H143.492C142.309 72 141.126 72.632 140.574 73.6591L87.5084 165.618L36.414 254.259C35.862 255.286 35.862 256.55 36.414 257.656L87.5084 346.297L140.495 438.335C141.047 439.362 142.23 440.073 143.413 439.994H351.654C352.837 439.994 354.02 439.362 354.651 438.335L405.745 349.694C406.297 348.667 407.48 347.956 408.663 348.035H472.215C474.344 348.035 476 346.297 476 344.243V167.83C475.921 165.697 474.186 163.959 472.136 163.959ZM228.728 349.694L212.721 377.345C212.485 377.74 212.091 378.135 211.696 378.372C211.223 378.609 210.75 378.767 210.198 378.767H178.422C177.318 378.767 176.293 378.214 175.82 377.187L128.431 294.787L123.779 286.65L106.748 257.498C106.511 257.103 106.353 256.629 106.432 256.076C106.432 255.602 106.59 255.049 106.827 254.654L123.937 224.949L175.899 134.886C176.451 133.938 177.476 133.306 178.501 133.306H210.198C210.75 133.306 211.302 133.464 211.854 133.701C212.248 133.938 212.643 134.254 212.879 134.728L228.886 162.537C229.359 163.485 229.28 164.67 228.728 165.539L177.397 254.654C177.16 255.049 177.081 255.523 177.081 255.918C177.081 256.392 177.239 256.787 177.397 257.182L228.728 346.218C229.438 347.403 229.359 348.667 228.728 349.694V349.694ZM388.083 257.498L371.051 286.65L366.399 294.787L319.011 377.187C318.459 378.135 317.512 378.767 316.409 378.767H284.632C284.08 378.767 283.607 378.609 283.134 378.372C282.74 378.135 282.346 377.819 282.109 377.345L266.103 349.694C265.393 348.667 265.393 347.403 266.024 346.376L317.355 257.34C317.591 256.945 317.67 256.471 317.67 256.076C317.67 255.602 317.513 255.207 317.355 254.812L266.024 165.697C265.472 164.749 265.393 163.643 265.866 162.695L281.873 134.886C282.109 134.491 282.503 134.096 282.898 133.859C283.371 133.543 283.923 133.464 284.553 133.464H316.409C317.512 133.464 318.538 134.017 319.011 135.044L370.972 225.107L388.083 254.812C388.319 255.286 388.477 255.76 388.477 256.234C388.477 256.55 388.319 257.024 388.083 257.498V257.498Z" fill="#008AAA"></path></svg>` : `${provider === "linkedin" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path></svg>` : `${provider === "notion" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" fill-rule="evenodd" clip-rule="evenodd" class="svelte-10a6av0"><path fill="#fff" fill-rule="evenodd" d="M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619 l23.971-1.387c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463 C13.171,14.718,12.862,15.181,12.862,16.182L12.862,16.182z" clip-rule="evenodd"></path><path fill="#424242" fill-rule="evenodd" d="M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619l23.971-1.387 c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463C13.171,14.718,12.862,15.181,12.862,16.182 L12.862,16.182z M36.526,17.413c0.154,0.694,0,1.387-0.695,1.465l-1.155,0.23v16.943c-1.003,0.539-1.928,0.847-2.698,0.847 c-1.234,0-1.543-0.385-2.467-1.54l-7.555-11.86v11.475l2.391,0.539c0,0,0,1.386-1.929,1.386l-5.317,0.308 c-0.154-0.308,0-1.078,0.539-1.232l1.388-0.385V20.418l-1.927-0.154c-0.155-0.694,0.23-1.694,1.31-1.772l5.704-0.385l7.862,12.015 V19.493l-2.005-0.23c-0.154-0.848,0.462-1.464,1.233-1.54L36.526,17.413z M7.389,5.862l21.968-1.618 c2.698-0.231,3.392-0.076,5.087,1.155l7.013,4.929C42.614,11.176,43,11.407,43,12.33v27.032c0,1.694-0.617,2.696-2.775,2.849 l-25.512,1.541c-1.62,0.077-2.391-0.154-3.239-1.232l-5.164-6.7C5.385,34.587,5,33.664,5,32.585V8.556 C5,7.171,5.617,6.015,7.389,5.862z" clip-rule="evenodd"></path></svg>` : `${provider === "slack" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21px" height="21px" class="svelte-10a6av0"><path fill="#33d375" d="M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.254,0,9.741,0,11c0,2.209,1.791,4,4,4s4-1.791,4-4	C33,17.741,33,9.254,33,8z"></path><path fill="#33d375" d="M43,19c0,2.209-1.791,4-4,4c-1.195,0-4,0-4,0s0-2.986,0-4c0-2.209,1.791-4,4-4S43,16.791,43,19z"></path><path fill="#40c4ff" d="M8,14c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.254,0,9.741,0,11,0c2.209,0,4-1.791,4-4s-1.791-4-4-4	C17.741,14,9.254,14,8,14z"></path><path fill="#40c4ff" d="M19,4c2.209,0,4,1.791,4,4c0,1.195,0,4,0,4s-2.986,0-4,0c-2.209,0-4-1.791-4-4S16.791,4,19,4z"></path><path fill="#e91e63" d="M14,39.006C14,41.212,15.791,43,18,43s4-1.788,4-3.994c0-1.252,0-9.727,0-10.984	c0-2.206-1.791-3.994-4-3.994s-4,1.788-4,3.994C14,29.279,14,37.754,14,39.006z"></path><path fill="#e91e63" d="M4,28.022c0-2.206,1.791-3.994,4-3.994c1.195,0,4,0,4,0s0,2.981,0,3.994c0,2.206-1.791,3.994-4,3.994	S4,30.228,4,28.022z"></path><path fill="#ffc107" d="M39,33c2.209,0,4-1.791,4-4s-1.791-4-4-4c-1.254,0-9.741,0-11,0c-2.209,0-4,1.791-4,4s1.791,4,4,4	C29.258,33,37.746,33,39,33z"></path><path fill="#ffc107" d="M28,43c-2.209,0-4-1.791-4-4c0-1.195,0-4,0-4s2.986,0,4,0c2.209,0,4,1.791,4,4S30.209,43,28,43z"></path></svg>` : `${provider === "spotify" ? `<svg width="21px" height="21px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-10a6av0"><path d="M255.498 31.0034C131.513 31.0034 31 131.515 31 255.502C31 379.492 131.513 480 255.498 480C379.497 480 480 379.495 480 255.502C480 131.522 379.497 31.0135 255.495 31.0135L255.498 31V31.0034ZM358.453 354.798C354.432 361.391 345.801 363.486 339.204 359.435C286.496 327.237 220.139 319.947 141.993 337.801C134.463 339.516 126.957 334.798 125.24 327.264C123.516 319.731 128.217 312.225 135.767 310.511C221.284 290.972 294.639 299.384 353.816 335.549C360.413 339.596 362.504 348.2 358.453 354.798ZM385.932 293.67C380.864 301.903 370.088 304.503 361.858 299.438C301.512 262.345 209.528 251.602 138.151 273.272C128.893 276.067 119.118 270.851 116.309 261.61C113.521 252.353 118.74 242.597 127.981 239.782C209.512 215.044 310.87 227.026 380.17 269.612C388.4 274.68 391 285.456 385.935 293.676V293.673L385.932 293.67ZM388.293 230.016C315.935 187.039 196.56 183.089 127.479 204.055C116.387 207.42 104.654 201.159 101.293 190.063C97.9326 178.964 104.189 167.241 115.289 163.87C194.59 139.796 326.418 144.446 409.723 193.902C419.722 199.826 422.995 212.71 417.068 222.675C411.168 232.653 398.247 235.943 388.303 230.016H388.293V230.016Z" fill="#1ED760"></path></svg>` : `${provider === "twitch" ? `<svg width="21px" height="21px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-10a6av0"><path d="M416 240L352 304H288L232 360V304H160V64H416V240Z" fill="white"></path><path d="M144 32L64 112V400H160V480L240 400H304L448 256V32H144ZM416 240L352 304H288L232 360V304H160V64H416V240Z" fill="#9146FF"></path><path d="M368 120H336V216H368V120Z" fill="#9146FF"></path><path d="M280 120H248V216H280V120Z" fill="#9146FF"></path></svg>` : `${provider === "workos" ? `<svg width="21px" height="21px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-10a6av0"><path d="M33 256.043C33 264.556 35.3159 273.069 39.4845 280.202L117.993 415.493C126.098 429.298 138.373 440.572 153.657 445.634C183.764 455.528 214.797 442.873 229.618 417.333L248.609 384.661L173.806 256.043L252.777 119.831L271.768 87.1591C277.557 77.2654 284.968 69.4424 294 63H285.894H172.185C150.878 63 131.193 74.2742 120.54 92.6812L39.7161 231.884C35.3159 239.016 33 247.53 33 256.043Z" fill="#6363F1"></path><path d="M480 256.058C480 247.539 477.684 239.021 473.516 231.883L393.849 94.6596C379.028 69.3331 347.995 56.4396 317.888 66.34C302.603 71.4053 290.329 82.6871 282.224 96.5015L264.391 127.354L339.194 256.058L260.223 392.131L241.232 424.825C235.443 434.495 228.032 442.553 219 449H227.106H340.815C362.122 449 381.807 437.718 392.46 419.299L473.284 280.003C477.684 272.866 480 264.577 480 256.058Z" fill="#6363F1"></path></svg>` : ``}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`;
    });
    Divider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["appearance"]);
      const dividerDefaultStyles = _({
        background: "$dividerBackground",
        display: "block",
        margin: "16px 0",
        height: "1px",
        width: "100%"
      });
      let { appearance = {} } = $$props;
      const classNames = generateClassNames("divider", dividerDefaultStyles(), appearance);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      return `<div${spread(
        [
          escape_object($$restProps),
          {
            style: escape_attribute_value(appearance?.style?.divider)
          },
          {
            class: escape_attribute_value(classNames.join(" "))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</div>`;
    });
    SocialAuth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let verticalSocialLayout;
      let { supabaseClient } = $$props;
      let { socialLayout } = $$props;
      let { redirectTo = void 0 } = $$props;
      let { onlyThirdPartyProviders } = $$props;
      let { i18n } = $$props;
      let { providers = [] } = $$props;
      let { providerScopes } = $$props;
      let { queryParams } = $$props;
      let { appearance } = $$props;
      let loading = false;
      let iconTitle = (provider) => template(i18n["sign_in"]?.social_provider_text, { provider: capitalize(provider) });
      if ($$props.supabaseClient === void 0 && $$bindings.supabaseClient && supabaseClient !== void 0)
        $$bindings.supabaseClient(supabaseClient);
      if ($$props.socialLayout === void 0 && $$bindings.socialLayout && socialLayout !== void 0)
        $$bindings.socialLayout(socialLayout);
      if ($$props.redirectTo === void 0 && $$bindings.redirectTo && redirectTo !== void 0)
        $$bindings.redirectTo(redirectTo);
      if ($$props.onlyThirdPartyProviders === void 0 && $$bindings.onlyThirdPartyProviders && onlyThirdPartyProviders !== void 0)
        $$bindings.onlyThirdPartyProviders(onlyThirdPartyProviders);
      if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
        $$bindings.i18n(i18n);
      if ($$props.providers === void 0 && $$bindings.providers && providers !== void 0)
        $$bindings.providers(providers);
      if ($$props.providerScopes === void 0 && $$bindings.providerScopes && providerScopes !== void 0)
        $$bindings.providerScopes(providerScopes);
      if ($$props.queryParams === void 0 && $$bindings.queryParams && queryParams !== void 0)
        $$bindings.queryParams(queryParams);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      verticalSocialLayout = socialLayout === "vertical" ? true : false;
      return `${providers.length ? `${validate_component(Container, "Container").$$render(
        $$result,
        {
          direction: "vertical",
          gap: "large",
          appearance
        },
        {},
        {
          default: () => {
            return `${validate_component(Container, "Container").$$render(
              $$result,
              {
                direction: verticalSocialLayout ? "vertical" : "horizontal",
                gap: verticalSocialLayout ? "small" : "medium",
                appearance
              },
              {},
              {
                default: () => {
                  return `${each(providers, (provider) => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        "aria-label": iconTitle(provider),
                        type: "submit",
                        color: "default",
                        loading,
                        appearance
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Icons, "Icons").$$render($$result, { provider }, {}, {})}
					${verticalSocialLayout ? `${escape(iconTitle(provider))}` : ``}
				`;
                        }
                      }
                    )}`;
                  })}`;
                }
              }
            )}`;
          }
        }
      )}
	${!onlyThirdPartyProviders ? `${validate_component(Divider, "Divider").$$render($$result, { appearance }, {}, {})}` : ``}` : ``}`;
    });
    css$1 = {
      code: "form.svelte-nm5p4o{width:100%}",
      map: null
    };
    UpdatePassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { i18n } = $$props;
      let { supabaseClient } = $$props;
      let { authView } = $$props;
      let { appearance } = $$props;
      let { showLinks = false } = $$props;
      let password = "";
      let loading = false;
      if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
        $$bindings.i18n(i18n);
      if ($$props.supabaseClient === void 0 && $$bindings.supabaseClient && supabaseClient !== void 0)
        $$bindings.supabaseClient(supabaseClient);
      if ($$props.authView === void 0 && $$bindings.authView && authView !== void 0)
        $$bindings.authView(authView);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      if ($$props.showLinks === void 0 && $$bindings.showLinks && showLinks !== void 0)
        $$bindings.showLinks(showLinks);
      $$result.css.add(css$1);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<form id="auth-update-password" method="post" class="svelte-nm5p4o">${validate_component(Container, "Container").$$render(
          $$result,
          {
            direction: "vertical",
            gap: "large",
            appearance
          },
          {},
          {
            default: () => {
              return `${validate_component(Container, "Container").$$render(
                $$result,
                {
                  direction: "vertical",
                  gap: "large",
                  appearance
                },
                {},
                {
                  default: () => {
                    return `<div>${validate_component(Label, "Label").$$render($$result, { for: "password", appearance }, {}, {
                      default: () => {
                        return `${escape(i18n?.update_password?.password_label)}`;
                      }
                    })}
				${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        id: "password",
                        type: "password",
                        name: "password",
                        autofocus: true,
                        placeholder: i18n?.update_password?.password_label,
                        autocomplete: "password",
                        appearance,
                        value: password
                      },
                      {
                        value: ($$value) => {
                          password = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}</div>
			${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        type: "submit",
                        color: "primary",
                        loading,
                        appearance
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(i18n?.update_password?.button_label)}`;
                        }
                      }
                    )}`;
                  }
                }
              )}

		${showLinks ? `${validate_component(Anchor, "Anchor").$$render($$result, { href: "#auth-magic-link", appearance }, {}, {
                default: () => {
                  return `${escape(i18n?.sign_in?.link_text)}`;
                }
              })}` : ``}
		${``}
		${``}`;
            }
          }
        )}
</form>`;
      } while (!$$settled);
      return $$rendered;
    });
    css = {
      code: "form.svelte-nm5p4o{width:100%}",
      map: null
    };
    VerifyOtp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { i18n } = $$props;
      let { supabaseClient } = $$props;
      let { authView } = $$props;
      let { otpType = "email" } = $$props;
      let { appearance } = $$props;
      let { showLinks = false } = $$props;
      let { email = "" } = $$props;
      let { phone = "" } = $$props;
      let { token = "" } = $$props;
      let loading = false;
      if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
        $$bindings.i18n(i18n);
      if ($$props.supabaseClient === void 0 && $$bindings.supabaseClient && supabaseClient !== void 0)
        $$bindings.supabaseClient(supabaseClient);
      if ($$props.authView === void 0 && $$bindings.authView && authView !== void 0)
        $$bindings.authView(authView);
      if ($$props.otpType === void 0 && $$bindings.otpType && otpType !== void 0)
        $$bindings.otpType(otpType);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      if ($$props.showLinks === void 0 && $$bindings.showLinks && showLinks !== void 0)
        $$bindings.showLinks(showLinks);
      if ($$props.email === void 0 && $$bindings.email && email !== void 0)
        $$bindings.email(email);
      if ($$props.phone === void 0 && $$bindings.phone && phone !== void 0)
        $$bindings.phone(phone);
      if ($$props.token === void 0 && $$bindings.token && token !== void 0)
        $$bindings.token(token);
      $$result.css.add(css);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<form id="auth-magic-link" method="post" class="svelte-nm5p4o">${validate_component(Container, "Container").$$render(
          $$result,
          {
            direction: "vertical",
            gap: "large",
            appearance
          },
          {},
          {
            default: () => {
              return `${["sms", "phone_change"].includes(otpType) ? `<div>${validate_component(Label, "Label").$$render($$result, { for: "phone", appearance }, {}, {
                default: () => {
                  return `${escape(i18n?.verify_otp?.phone_input_label)}`;
                }
              })}
				${validate_component(Input, "Input").$$render(
                $$result,
                {
                  id: "phone",
                  type: "text",
                  name: "phone",
                  autofocus: true,
                  placeholder: i18n?.verify_otp?.phone_input_placeholder,
                  autocomplete: "phone",
                  appearance,
                  value: phone
                },
                {
                  value: ($$value) => {
                    phone = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}</div>` : `<div>${validate_component(Label, "Label").$$render($$result, { for: "email", appearance }, {}, {
                default: () => {
                  return `${escape(i18n?.verify_otp?.email_input_label)}`;
                }
              })}
				${validate_component(Input, "Input").$$render(
                $$result,
                {
                  id: "email",
                  type: "email",
                  name: "email",
                  autofocus: true,
                  placeholder: i18n?.verify_otp?.email_input_placeholder,
                  autocomplete: "email",
                  appearance,
                  value: email
                },
                {
                  value: ($$value) => {
                    email = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}</div>`}
		<div>${validate_component(Label, "Label").$$render($$result, { for: "token", appearance }, {}, {
                default: () => {
                  return `${escape(i18n?.verify_otp?.token_input_label)}`;
                }
              })}
			${validate_component(Input, "Input").$$render(
                $$result,
                {
                  id: "token",
                  type: "text",
                  name: "token",
                  placeholder: i18n?.verify_otp?.token_input_placeholder,
                  autocomplete: "token",
                  appearance,
                  value: token
                },
                {
                  value: ($$value) => {
                    token = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}</div>
		${validate_component(Button, "Button").$$render(
                $$result,
                {
                  type: "submit",
                  color: "primary",
                  loading,
                  appearance
                },
                {},
                {
                  default: () => {
                    return `${escape(i18n?.verify_otp?.button_label)}`;
                  }
                }
              )}

		${showLinks ? `${validate_component(Anchor, "Anchor").$$render($$result, { href: "#auth-sign-in", appearance }, {}, {
                default: () => {
                  return `${escape(i18n?.sign_in?.link_text)}`;
                }
              })}` : ``}
		${``}
		${``}`;
            }
          }
        )}
</form>`;
      } while (!$$settled);
      return $$rendered;
    });
    Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let i18n;
      let themeVariables;
      let SignView;
      let { supabaseClient } = $$props;
      let { socialLayout = "vertical" } = $$props;
      let { providers = [] } = $$props;
      let { providerScopes = void 0 } = $$props;
      let { queryParams = void 0 } = $$props;
      let { view = "sign_in" } = $$props;
      let { redirectTo = void 0 } = $$props;
      let { onlyThirdPartyProviders = false } = $$props;
      let { magicLink = false } = $$props;
      let { showLinks = true } = $$props;
      let { appearance = {} } = $$props;
      let { theme = "default" } = $$props;
      let { localization = {} } = $$props;
      let { otpType = "email" } = $$props;
      let { additionalData } = $$props;
      if ($$props.supabaseClient === void 0 && $$bindings.supabaseClient && supabaseClient !== void 0)
        $$bindings.supabaseClient(supabaseClient);
      if ($$props.socialLayout === void 0 && $$bindings.socialLayout && socialLayout !== void 0)
        $$bindings.socialLayout(socialLayout);
      if ($$props.providers === void 0 && $$bindings.providers && providers !== void 0)
        $$bindings.providers(providers);
      if ($$props.providerScopes === void 0 && $$bindings.providerScopes && providerScopes !== void 0)
        $$bindings.providerScopes(providerScopes);
      if ($$props.queryParams === void 0 && $$bindings.queryParams && queryParams !== void 0)
        $$bindings.queryParams(queryParams);
      if ($$props.view === void 0 && $$bindings.view && view !== void 0)
        $$bindings.view(view);
      if ($$props.redirectTo === void 0 && $$bindings.redirectTo && redirectTo !== void 0)
        $$bindings.redirectTo(redirectTo);
      if ($$props.onlyThirdPartyProviders === void 0 && $$bindings.onlyThirdPartyProviders && onlyThirdPartyProviders !== void 0)
        $$bindings.onlyThirdPartyProviders(onlyThirdPartyProviders);
      if ($$props.magicLink === void 0 && $$bindings.magicLink && magicLink !== void 0)
        $$bindings.magicLink(magicLink);
      if ($$props.showLinks === void 0 && $$bindings.showLinks && showLinks !== void 0)
        $$bindings.showLinks(showLinks);
      if ($$props.appearance === void 0 && $$bindings.appearance && appearance !== void 0)
        $$bindings.appearance(appearance);
      if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
        $$bindings.theme(theme);
      if ($$props.localization === void 0 && $$bindings.localization && localization !== void 0)
        $$bindings.localization(localization);
      if ($$props.otpType === void 0 && $$bindings.otpType && otpType !== void 0)
        $$bindings.otpType(otpType);
      if ($$props.additionalData === void 0 && $$bindings.additionalData && additionalData !== void 0)
        $$bindings.additionalData(additionalData);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        i18n = merge(en_default, localization.variables ?? {});
        {
          X({
            theme: merge(appearance?.theme?.default ?? {}, appearance?.variables?.default ?? {})
          });
        }
        themeVariables = q(merge(
          // @ts-ignore
          appearance?.theme?.[theme],
          appearance?.variables?.[theme] ?? {}
        ));
        SignView = view === "sign_in" || view === "sign_up" || view === "magic_link";
        $$rendered = `<div${add_attribute("class", theme !== "default" ? themeVariables : "", 0)}>${SignView ? `${validate_component(SocialAuth, "SocialAuth").$$render(
          $$result,
          {
            appearance,
            supabaseClient,
            providers,
            providerScopes,
            queryParams,
            socialLayout,
            redirectTo,
            onlyThirdPartyProviders,
            i18n
          },
          {},
          {}
        )}` : ``}
	${view === VIEWS.SIGN_IN ? `${!onlyThirdPartyProviders ? `${validate_component(EmailAuth, "EmailAuth").$$render(
          $$result,
          {
            appearance,
            supabaseClient,
            redirectTo,
            magicLink,
            showLinks,
            i18n,
            additionalData,
            authView: view
          },
          {
            authView: ($$value) => {
              view = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}` : ``}
	${view === VIEWS.SIGN_UP ? `${!onlyThirdPartyProviders ? `${validate_component(EmailAuth, "EmailAuth").$$render(
          $$result,
          {
            appearance,
            supabaseClient,
            redirectTo,
            magicLink,
            showLinks,
            additionalData,
            i18n,
            authView: view
          },
          {
            authView: ($$value) => {
              view = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${slots.default ? slots.default({}) : ``}`;
            }
          }
        )}` : ``}` : ``}
	${view === VIEWS.FORGOTTEN_PASSWORD ? `${validate_component(ForgottenPassword, "ForgottenPassword").$$render(
          $$result,
          {
            i18n,
            supabaseClient,
            showLinks,
            appearance,
            authView: view
          },
          {
            authView: ($$value) => {
              view = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}
	${view === VIEWS.MAGIC_LINK ? `${validate_component(MagicLink, "MagicLink").$$render(
          $$result,
          {
            i18n,
            supabaseClient,
            appearance,
            redirectTo,
            showLinks,
            authView: view
          },
          {
            authView: ($$value) => {
              view = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}
	${view === VIEWS.UPDATE_PASSWORD ? `${validate_component(UpdatePassword, "UpdatePassword").$$render(
          $$result,
          {
            i18n,
            supabaseClient,
            appearance,
            showLinks,
            authView: view
          },
          {
            authView: ($$value) => {
              view = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}
	${view === VIEWS.VERIFY_OTP ? `${validate_component(VerifyOtp, "VerifyOtp").$$render(
          $$result,
          {
            i18n,
            supabaseClient,
            appearance,
            showLinks,
            otpType,
            authView: view
          },
          {
            authView: ($$value) => {
              view = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-1hgwsyy_START -->${$$result.title = `<title>User Management</title>`, ""}<!-- HEAD_svelte-1hgwsyy_END -->`, ""}

<div class="row flex-center flex"><div class="col-6 form-widget">${validate_component(Auth, "Auth").$$render(
        $$result,
        {
          additionalData: { url: data.url },
          supabaseClient: data.supabase,
          view: "magic_link",
          redirectTo: `${data.url}/logging-in?redirect=/`,
          showLinks: false,
          appearance: {
            theme: ThemeSupa,
            style: { input: "color: #fff" }
          }
        },
        {},
        {}
      )}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  server: () => page_server_ts_exports,
  server_id: () => server_id2,
  stylesheets: () => stylesheets3
});
var index3, component3, server_id2, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_page_server_ts();
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    server_id2 = "src/routes/+page.server.ts";
    imports3 = ["_app/immutable/nodes/2.3c36147a.js", "_app/immutable/chunks/index.1e274763.js"];
    stylesheets3 = ["_app/immutable/assets/2.0a15a45c.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/account/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  actions: () => actions,
  load: () => load4
});
var load4, actions;
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/account/_page.server.ts.js"() {
    init_chunks();
    load4 = async ({ locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, "/");
      }
      const { data: profile } = await supabase.from("profiles").select(`username, full_name, website, avatar_url`).eq("id", session.user.id).single();
      return { session, profile };
    };
    actions = {
      update: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const fullName = formData.get("fullName");
        const username = formData.get("username");
        const website = formData.get("website");
        const avatarUrl = formData.get("avatarUrl");
        const session = await getSession();
        const { error: error2 } = await supabase.from("profiles").upsert({
          id: session?.user.id,
          full_name: fullName,
          username,
          website,
          avatar_url: avatarUrl,
          updated_at: /* @__PURE__ */ new Date()
        });
        if (error2) {
          return fail(500, {
            fullName,
            username,
            website,
            avatarUrl
          });
        }
        return {
          fullName,
          username,
          website,
          avatarUrl
        };
      },
      signout: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (session) {
          await supabase.auth.signOut();
          throw redirect(303, "/");
        }
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/account/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/account/_page.svelte.js"() {
    init_index3();
    init_singletons();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let { form } = $$props;
      let { session, supabase, profile } = data;
      let profileForm;
      let fullName = profile?.full_name ?? "";
      let username = profile?.username ?? "";
      let website = profile?.website ?? "";
      profile?.avatar_url ?? "";
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.form === void 0 && $$bindings.form && form !== void 0)
        $$bindings.form(form);
      return `<div class="form-widget"><form class="form-widget" method="post" action="?/update"${add_attribute("this", profileForm, 0)}><div><label for="email">Email</label>
			<input id="email" type="text"${add_attribute("value", session?.user.email, 0)} disabled></div>

		<div><label for="fullName">Full Name</label>
			<input id="fullName" name="fullName" type="text"${add_attribute("value", form?.fullName ?? fullName, 0)}></div>

		<div><label for="username">Username</label>
			<input id="username" name="username" type="text"${add_attribute("value", form?.username ?? username, 0)}></div>

		<div><label for="website">Website</label>
			<input id="website" name="website" type="url"${add_attribute("value", form?.website ?? website, 0)}></div>

		<div><input type="submit" class="button block primary"${add_attribute("value", "Update", 0)} ${""}></div></form>

	<form method="post" action="?/signout"><div><button class="button block" ${""}>Sign Out</button></div></form></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  server: () => page_server_ts_exports2,
  server_id: () => server_id3,
  stylesheets: () => stylesheets4
});
var index4, component4, server_id3, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_page_server_ts2();
    index4 = 3;
    component4 = async () => (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    server_id3 = "src/routes/account/+page.server.ts";
    imports4 = ["_app/immutable/nodes/3.6ceb156e.js", "_app/immutable/chunks/index.1e274763.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/singletons.f5ab9338.js", "_app/immutable/chunks/navigation.72ad0ca1.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/logging-in/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/logging-in/_page.svelte.js"() {
    init_index3();
    init_singletons();
    init_stores();
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value2) => $page = value2);
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      {
        {
          $page.url.searchParams.get("redirect");
        }
      }
      $$unsubscribe_page();
      return `<section>&quot;Because as we know, there are known knowns; there are things we know we know. We also know there
	are known unknowns; that is to say we know there are some things we do not know. But there are
	also unknown unknowns\u2014the ones we don&#39;t know we don&#39;t know&quot; - Donald Rumsfeld
</section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    imports5 = ["_app/immutable/nodes/4.586bdc66.js", "_app/immutable/chunks/index.1e274763.js", "_app/immutable/chunks/navigation.72ad0ca1.js", "_app/immutable/chunks/singletons.f5ab9338.js", "_app/immutable/chunks/stores.15190d57.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_index3();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `


${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "9pfzhx"
};
function get_hooks() {
  return Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports));
}

// .svelte-kit/output/server/index.js
init_chunks();
init_index2();
var DEV = false;
function negotiate(accept, types2) {
  const parts = [];
  accept.split(",").forEach((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q2 = "1"] = match;
      parts.push({ type, subtype, q: +q2, i: i2 });
    }
  });
  parts.sort((a2, b2) => {
    if (a2.q !== b2.q) {
      return b2.q - a2.q;
    }
    if (a2.subtype === "*" !== (b2.subtype === "*")) {
      return a2.subtype === "*" ? 1 : -1;
    }
    if (a2.type === "*" !== (b2.type === "*")) {
      return a2.type === "*" ? 1 : -1;
    }
    return a2.i - b2.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types2) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types2.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {Redirect | HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].filter(
    (method) => method in mod
  );
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location2) {
  const response = new Response(void 0, {
    status,
    headers: { location: location2 }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push(`"parent":1`);
  if (node.uses?.route)
    uses.push(`"route":1`);
  if (node.uses?.url)
    uses.push(`"url":1`);
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler2 = mod[method];
  if (!handler2 && method === "HEAD") {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await handler2(
      /** @type {import('types').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e2) {
    if (e2 instanceof Redirect) {
      return new Response(void 0, {
        status: e2.status,
        headers: { location: e2.location }
      });
    }
    throw e2;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE" || method === "OPTIONS") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i2 = 0; i2 < len; i2 += 1) {
    const char = str[i2];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i2) + replacement;
      last_pos = i2 + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value2, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value22, i2) => {
            keys.push(`[${i2}]`);
            walk(value22);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value22] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive$1(key2) : "..."})`
            );
            walk(value22);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value2);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a2, b2) => b2[1] - a2[1]).forEach((entry, i2) => {
    names.set(entry[0], get_name(i2));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive$1(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v2, i2) => i2 in thing ? stringify2(v2) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value2);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive$1(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v2, i2) => {
            statements.push(`${name}[${i2}]=${stringify2(v2)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v2) => `add(${stringify2(v2)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k2, v2]) => `set(${stringify2(k2)}, ${stringify2(v2)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive$1(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify(value2, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p2 = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index22 = p2++;
    indexes.set(thing, index22);
    for (const { key: key2, fn } of custom) {
      const value22 = fn(thing);
      if (value22) {
        stringified[index22] = `["${key2}",${flatten(value22)}]`;
        return index22;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i2 = 0; i2 < thing.length; i2 += 1) {
            if (i2 > 0)
              str += ",";
            if (i2 in thing) {
              keys.push(`[${i2}]`);
              str += flatten(thing[i2]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value22 of thing) {
            str += `,${flatten(value22)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value22] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value22)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index6 = flatten(value2);
  if (index6 < 0)
    return `${index6}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e2) {
    const err = normalize_error(e2);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error(`Cannot "throw fail()". Use "return fail()"`) : error2;
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e2) {
    const err = normalize_error(e2);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions2) {
  if (actions2.default && Object.keys(actions2).length > 1) {
    throw new Error(
      `When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
    );
  }
}
async function call_action(event, actions2) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions2[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e2) {
    const error2 = (
      /** @type {any} */
      e2
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value2]) => [key3, await value2]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: init2?.headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value2 = get2.call(response.headers, lower);
        if (value2 && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value2);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value2;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder2 = new TextDecoder();
  while (true) {
    const { done, value: value2 } = await reader.read();
    if (done) {
      break;
    }
    result += decoder2.decode(value2);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value2 of values) {
    if (typeof value2 === "string") {
      let i2 = value2.length;
      while (i2)
        hash2 = hash2 * 33 ^ value2.charCodeAt(--i2);
    } else if (ArrayBuffer.isView(value2)) {
      const buffer = new Uint8Array(value2.buffer, value2.byteOffset, value2.byteLength);
      let i2 = buffer.length;
      while (i2)
        hash2 = hash2 * 33 ^ buffer[--i2];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let vary = false;
  for (const [key2, value2] of fetched.response.headers) {
    if (filter(key2, value2)) {
      headers[key2] = value2;
    }
    if (key2 === "cache-control")
      cache_control = value2;
    if (key2 === "age")
      age = value2;
    if (key2 === "vary")
      vary = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !vary) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha2562(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w2 = array2.subarray(i2, i2 + 16);
    let tmp;
    let a2;
    let b2;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w2[i22];
      } else {
        a2 = w2[i22 + 1 & 15];
        b2 = w2[i22 + 14 & 15];
        tmp = w2[i22 & 15] = (a2 >>> 7 ^ a2 >>> 18 ^ a2 >>> 3 ^ a2 << 25 ^ a2 << 14) + (b2 >>> 17 ^ b2 >>> 19 ^ b2 >>> 10 ^ b2 << 15 ^ b2 << 13) + w2[i22 & 15] + w2[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a2 = bytes[i2 + 0];
    const b2 = bytes[i2 + 1];
    const c2 = bytes[i2 + 2];
    const d2 = bytes[i2 + 3];
    bytes[i2 + 0] = d2;
    bytes[i2 + 1] = c2;
    bytes[i2 + 2] = b2;
    bytes[i2 + 3] = a2;
  }
}
function encode$1(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l2; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l2 + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l2) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d2 = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d2["script-src"] || d2["default-src"];
    const effective_style_src = d2["style-src"] || d2["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value2) => value2 !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value2) => value2 !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha2562(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha2562(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value2 = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value2)
        continue;
      const directive = [key2];
      if (Array.isArray(value2)) {
        value2.forEach((value22) => {
          if (quoted.has(value22) || crypto_pattern.test(value22)) {
            directive.push(`'${value22}'`);
          } else {
            directive.push(value22);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v2) => !!v2).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f2, r2) => {
    fulfil = f2;
    reject = r2;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  let deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value2) => {
      deferred[deferred.length - 1].fulfil({
        value: value2,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets6 = new Set(client.stylesheets);
  const fonts6 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      data2 = { ...data2, ...branch[i2].data };
      props[`data_${i2}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets6.add(url);
      for (const url of node.fonts)
        fonts6.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k2, v2]) => inline_styles.set(k2, v2));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets6) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts6) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b2) => b2.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push(`const deferred = new Map();`);
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = [`app`, `element`];
    blocks.push(`const element = document.currentScript.parentElement;`);
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e2) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e2) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e2
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value2, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value2
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e2) {
    if (e2 instanceof Redirect) {
      return redirect_response(e2.status, e2.location);
    }
    return static_error_page(
      options2,
      e2 instanceof HttpError ? e2.status : 500,
      (await handle_error_and_jsonify(event, options2, e2)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder3 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n2, i2) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n2 == void 0 ? n2 : await manifest2._.nodes[n2]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j2]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e2) {
          aborted = true;
          throw e2;
        }
      });
    });
    const promises = functions.map(async (fn, i2) => {
      if (!invalidated[i2]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p2, i2) => p2.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i2 + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder3.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder3.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e2) {
    const error2 = normalize_error(e2);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    location: redirect2.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e2) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e2
            );
          }
        ).then(
          /** @param {any} value */
          async (value2) => {
            let str;
            try {
              str = stringify(value2, reducers);
            } catch (e2) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e2) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e2
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n2) => n2 == void 0 ? n2 : manifest2._.nodes[n2]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i2) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = await server_promises[j2];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e2) {
          load_error = /** @type {Error} */
          e2;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i2) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                Object.assign(data, await load_promises[j2]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i2],
            state,
            csr
          });
        } catch (e2) {
          load_error = /** @type {Error} */
          e2;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises)
      p2.catch(() => {
      });
    for (const p2 of load_promises)
      p2.catch(() => {
      });
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      if (node) {
        try {
          const server_data = await server_promises[i2];
          const data = await load_promises[i2];
          branch.push({ node, server_data, data });
        } catch (e2) {
          const err = normalize_error(e2);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i2--) {
            if (page2.errors[i2]) {
              const index6 = (
                /** @type {number} */
                page2.errors[i2]
              );
              const node2 = await manifest2._.nodes[index6]();
              let j2 = i2;
              while (!branch[j2])
                j2 -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j2 + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e2) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e2,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i2 = 0; i2 < params.length; i2 += 1) {
    const param = params[i2];
    const value2 = values[i2 - buffered];
    if (param.chained && param.rest && buffered) {
      result[param.name] = values.slice(i2 - buffered, i2 + 1).filter((s22) => s22).join("/");
      buffered = 0;
      continue;
    }
    if (value2 === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value2)) {
      result[param.name] = value2;
      const next_param = params[i2 + 1];
      const next_value = values[i2 + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options2) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options2 || {};
  var dec = opt.decode || decode3;
  var index6 = 0;
  while (index6 < str.length) {
    var eqIdx = str.indexOf("=", index6);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index6);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index6 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index6, eqIdx).trim();
    if (void 0 === obj[key2]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index6 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options2) {
  var opt = options2 || {};
  var enc = opt.encode || encode3;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value2 = enc(val);
  if (value2 && !fieldContentRegExp.test(value2)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value2;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode3(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode3(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode22) {
  try {
    return decode22(str);
  } catch (e2) {
    return str;
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse_1(header, { decode: (value2) => value2 });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('types').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c2 = new_cookies[name];
      if (c2 && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
        return c2.value;
      }
      const decoder2 = opts?.decode || decodeURIComponent;
      const req_cookies = parse_1(header, { decode: decoder2 });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder2 = opts?.decode || decodeURIComponent;
      const cookies2 = parse_1(header, { decode: decoder2 });
      for (const c2 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          cookies2[c2.name] = c2.value;
        }
      }
      return Object.entries(cookies2).map(([name, value2]) => ({ name, value: value2 }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value2, opts = {}) {
      set_internal(name, value2, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value2, opts) {
      return serialize_1(name, value2, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = parse_1(header2, { decode: (value2) => value2 });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value2]) => `${name}=${value2}`).join("; ");
  }
  function set_internal(name, value2, opts) {
    let path = opts.path ?? default_path;
    new_cookies[name] = {
      name,
      value: value2,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value: value2, options: options2 } = new_cookie;
    headers.append("set-cookie", serialize_1(name, value2, options2));
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options2) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value2 = parsed.value;
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  try {
    value2 = options2.decodeValues ? decodeURIComponent(value2) : value2;
  } catch (e2) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value2 + "'. Set options.decodeValues to false to disable this feature.",
      e2
    );
  }
  var cookie = {
    name,
    value: value2
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value22 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value22);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value22, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value22;
    } else {
      cookie[key2] = value22;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value2 = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value2 = nameValueArr.join("=");
  } else {
    value2 = nameValuePairStr;
  }
  return { name, value: value2 };
}
function parse(input, options2) {
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!input) {
    if (!options2.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key2) {
        return key2.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options2.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!options2.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options2);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options2);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        let response;
        const prefix2 = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of splitCookiesString_1(set_cookie)) {
            const { name, value: value2, ...options3 } = parseString_1(str);
            set_internal(
              name,
              value2,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  let supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(`, `)}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "actions"]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
async function respond(request, options2, manifest2, state) {
  let url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value2 = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value2;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value2;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n2) => n2 == void 0 ? n2 : manifest2._.nodes[n2]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value2 = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value2
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value2 = response.headers.get(key2);
          if (value2)
            headers2.set(key2, value2);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location2 = response.headers.get("location");
      if (location2) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location2
        ));
      }
    }
    return response;
  } catch (e2) {
    if (e2 instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e2) : route?.page && is_action_json_request(event) ? action_json_redirect(e2) : redirect_response(e2.status, e2.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e2);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e2) {
      return await handle_fatal_error(event2, options2, e2);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
var _options, _manifest;
var Server = class {
  /** @param {import('types').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('types').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    const entries = Object.entries(env);
    const prefix2 = __privateGet(this, _options).env_public_prefix;
    Object.fromEntries(entries.filter(([k2]) => !k2.startsWith(prefix2)));
    const pub = Object.fromEntries(entries.filter(([k2]) => k2.startsWith(prefix2)));
    set_public_env(pub);
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/netlify-tmp/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    client: { "start": "_app/immutable/entry/start.04fdb913.js", "app": "_app/immutable/entry/app.20bd7d53.js", "imports": ["_app/immutable/entry/start.04fdb913.js", "_app/immutable/chunks/index.1e274763.js", "_app/immutable/chunks/singletons.f5ab9338.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/entry/app.20bd7d53.js", "_app/immutable/chunks/preload-helper.41c905a7.js", "_app/immutable/chunks/index.1e274763.js"], "stylesheets": [], "fonts": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5))
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      },
      {
        id: "/account",
        pattern: /^\/account\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "/logging-in",
        pattern: /^\/logging-in\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 4 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
var prerendered = /* @__PURE__ */ new Set([]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  // @ts-ignore
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file = pathname.substring(1);
  try {
    file = decodeURIComponent(file);
  } catch (err) {
  }
  return manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! Bundled license information:

@supabase/auth-helpers-shared/dist/index.mjs:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=render.js.map
