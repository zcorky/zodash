// COMMON
// 
// DATA: http://user:pass@host.com:8080/path/to/file?query=string#hash
//
// href           [1]   http://user:pass@host.com:8080/path/to/file?query=string#hash
// origin         [2]   http://user:pass@host.com:8080
//  protocol      [3]   http:
//    scheme      [4]   http
//  auth          [5]   user:pass
//    username    [6]   user
//    password    [7]   pass
//  host          [8]   host.com:8080
//    hostname    [9]   host.com
//    port        [10]  8080
//  path          [11]  /path/to/file?query=string
//    pathname    [12]  /path/to/file
//    search      [13]  ?query=string
//      query     [14]  query=string
//  hash          [15]  #hash
//
// export const COMMON = /^(((([^:]+):)\/\/(?:(([^:]+):?([^@]+)?)@)?(([^:/]+)(?::([^/]+))?))(([^?$]+)((?:\?([^#]+)?)))?(#[^$].*)?)/;

// NAMED
//
// DATA: http://user:pass@host.com:8080/path/to/file?query=string#hash
//
// href           http://user:pass@host.com:8080/path/to/file?query=string#hash
// origin         http://user:pass@host.com:8080
//  protocol      http:
//    scheme      http
//  auth          user:pass
//    username    user
//    password    pass
//  host          host.com:8080
//    hostname    host.com
//    port        8080
//  path          /path/to/file?query=string
//    pathname    /path/to/file
//    search      ?query=string
//      query     query=string
//  hash          #hash
//
export const NAMED = /^(?<href>(?<origin>(?<protocol>(?<scheme>[^:]+):)\/\/((?<auth>(?<username>[^:]+):?(?<password>[^@]+)?)@)?(?<host>((?<hostname>[^:/]+)(:(?<port>[^/]+))?)))((?<path>(?<pathname>[^?$]+)(?<search>(\?(?<query>[^#]+)?))?)(?<hash>#[^$].*)?)?)/;
