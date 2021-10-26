
      
      
      const _global = (global || window) as any;
      
      function boolean<X>(x: X): boolean;
      function boolean(x) {
            return !!x;
        }
      _global.boolean = boolean
    
      
      /**
        
      Evaluates _test_. If _test_ is not _false_ or _null_ returns _then_, otherwise returns _else__. If _else__ is not supplied it returns _null_.

      ### Examples:

      iff(eql('a', 'a'), 'yes') // 'yes'

      iff(eql('a', 'b'), 'yes') // _null_

      iff(eql('a', 'b'), 'yes', 'no') // 'no'
    
      */
      
      function iff<T, E = null>(test: boolean, then: T, else_?: E): T | E;
      function iff(test, then, else_) {
            if (else_ === void 0) { else_ = null; }
            // @ts-ignore
            return boolean(test) ? then : else_;
        }
      _global.iff = iff
    
      
      function eql<T>(a: T, b: T, ...args: T[]): boolean
      function eql(a, b) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __spreadArray([a, b], args, true).every(function (v) { return v === a; });
        }
      _global.eql = eql
    