// Nodejs url.parse doc
//  => Browser URL
//  => Whatwg URL
//  
//  Reference: https://www.liaoxuefeng.com/wiki/1022910821149312/1023025830950720
//  Visualization: http://wangwl.net/static/projects/visualRegex/#flags=&source=%2F%5E(%3F%3Chref%3E(%3F%3Corigin%3E(%3F%3Cprotocol%3E(%3F%3Cscheme%3E%5B%5E%3A%5D%2B)%3A)%5C%2F%5C%2F((%3F%3Cauth%3E(%3F%3Cusername%3E%5B%5E%3A%5D%2B)%3A%3F(%3F%3Cpassword%3E%5B%5E%40%5D%2B)%3F)%40)%3F(%3F%3Chost%3E((%3F%3Chostname%3E%5B%5E%3A%2F%5D%2B)(%3A(%3F%3Cport%3E%5B%5E%2F%5D%2B))%3F)))((%3F%3Cpath%3E(%3F%3Cpathname%3E%5B%5E%3F%24%5D%2B)(%3F%3Csearch%3E(%5C%3F(%3F%3Cquery%3E%5B%5E%23%5D%2B)%3F))%3F)(%3F%3Chash%3E%23%5B%5E%24%5D.*)%3F)%3F)%2F&match=&method=exec


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
