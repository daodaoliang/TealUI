﻿/**
 * @fileOverview 对象(Object)扩展
 */

declare global {

    interface ObjectConstructor {

        // #region 语言自带

        /**
         * 复制对象的所有属性到目标对象。
         * @param target 复制的目标对象。
         * @param sources 复制的源对象。
         * @returns 返回 *target*。
         * @example Object.assign({a: 1}, {b: 2}) // {a: 1, b: 2}
         * @example Object.assign({a: 1}, {a: 2}) // {a: 2}
         * @example Object.assign({a: 1}, {b: 2}, {b: 3}) // {a: 1, b: 3}
         * @since ES6
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
         */
        assign<T>(target: T, ...sources: any[]): T;

        /**
         * 获取对象的所有键。
         * @param obj 要获取的对象。
         * @returns 返回所有键组成的数组。
         * @example Object.keys({a: 3, b: 5}) // ["a", "b"]
         * @since ES5
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
         * @see values
         */
        keys(obj: any): string[];

        /**
         * 获取对象的所有值。
         * @param obj 要获取的对象。
         * @returns 返回所有值组成的数组。
         * @example Object.values({a: 3, b: 5}) // [3, 5]
         * @since ES7
         * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values
         * @see keys
         */
        values(obj: any): string[];

        // #endregion

        // #region 模拟数组

        /**
         * 遍历指定类数组，并对每一项执行 *callback*。
         * @param iterable 要遍历的类数组。
         * @param callback 对每一项执行的回调函数。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的类数组。
         * - returns 函数可以返回 false 以终止循环。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 如果循环是因为 *callback* 返回 false 而中止，则返回 false，否则返回 true。
         * @example Object.each(["a", "b"], console.log, console); // 打印 '0  a' 和 '1  b'
         */
        each<T>(iterable: { [key: number]: T }, callback: (value: T, index: number, target: typeof iterable) => boolean | void, scope?: any): boolean;

        /**
         * 遍历指定对象，并对每一项执行 *callback*。
         * @param iterable 要遍历的对象（不支持函数）。
         * @param callback 对每一项执行的回调函数。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的对象。
         * - returns 函数可以返回 false 以终止循环。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 如果循环是因为 *callback* 返回 false 而中止，则返回 false，否则返回 true。
         * @example Object.each({a: 1, b: 2}, console.log, console); // 打印 'a  1' 和 'b  2'
         */
        each<T>(iterable: { [key: string]: T }, callback: (value: T, index: string, target: typeof iterable) => boolean | void, scope?: any): boolean;

        /**
         * 筛选指定类数组中符合要求的项并组成一个新数组。
         * @param iterable 要遍历的类数组。
         * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的类数组。
         * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回一个新数组。
         * @example Object.filter([1, 2], function(item){return item > 1;}) // [2]
         */
        filter<T>(iterable: { [key: number]: T }, callback: (value: T, index: number, target: typeof iterable) => boolean, scope?: any): T[];

        /**
         * 筛选指定对象中符合要求的项并组成一个对象。
         * @param iterable 要遍历的对象（不支持函数）。
         * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的对象。
         * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回一个对象。
         * @example Object.filter({a: 1, b: 2}, function(item){ return item > 1; }) // {b:2}
         */
        filter<T>(iterable: { [key: string]: T }, callback: (value: T, index: string, target: typeof iterable) => boolean, scope?: any): { [key: string]: T };

        /**
         * 遍历指定类数组，并对每一项执行 *callback*，然后返回每个结果组成的新数组。
         * @param iterable 要遍历的类数组。
         * @param callback 对每一项执行的回调函数，用于计算每一项的返回值。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的类数组。
         * - returns 返回结果。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回一个新数组。
         * @example Object.map(["a", "b"], function(a){ return a + a; }) // ["aa", "bb"]
         * @example Object.map({length: 1, "0": "a"}, function(a){ return a + a; }) // ["a"]
         */
        map<TInput, TOutput>(iterable: { [key: number]: TInput }, callback: (value: TInput, index: number, target: typeof iterable) => TOutput, scope?: any): TOutput[];

        /**
         * 遍历指定对象，并对每一项执行 *callback*，然后返回每个结果组成的对象。
         * @param iterable 要遍历的对象（不支持函数）。
         * @param callback 对每一项执行的回调函数，用于计算每一项的返回值。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的对象。
         * - returns 返回结果。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回一个对象。
         * @example Object.map({a: "a", b: "b"}, function(a){ return a + a; }) // {a: "aa", b: "bb"}
         */
        map<TInput, TOutput>(iterable: { [key: string]: TInput }, callback: (value: TInput, index: string, target: typeof iterable) => TOutput, scope?: any): { [key: string]: TInput };

        /**
         * 判断指定类数组是否每一项都满足指定条件。
         * @param iterable 要遍历的类数组。
         * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的类数组。
         * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 如果所有项满足条件则返回 true，否则返回 false。
         * @example Object.every([1, 2], function(item) {return item > 0}) // true
         * @example Object.every([1, 2], function(item) {return item > 1}) // false
         * @example Object.every([1, 2], function(item) {return item > 2}) // false
         */
        every<T>(iterable: { [key: number]: T }, callback: (value: T, index: number, target: typeof iterable) => boolean, scope?: any): boolean;

        /**
         * 判断指定对象是否每一项都满足指定条件。
         * @param iterable 要遍历的对象（不支持函数）。
         * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的对象。
         * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 如果所有项满足条件则返回 true，否则返回 false。
         * @example Object.every({a: 1, b: 2}, function(item) {return item > 0}) // true
         * @example Object.every({a: 1, b: 2}, function(item) {return item > 1}) // false
         * @example Object.every({a: 1, b: 2}, function(item) {return item > 2}) // false
         */
        every<T>(iterable: { [key: string]: T }, callback: (value: T, index: string, target: typeof iterable) => boolean, scope?: any): boolean;

        /**
         * 判断指定类数组是否至少存在一项满足指定条件。
         * @param iterable 要遍历的类数组。
         * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的类数组。
         * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 如果至少存在一项满足条件则返回 true，否则返回 false。
         * @example Object.some([1, 2], function(item) {return item > 0}) // true
         * @example Object.some([1, 2], function(item) {return item > 1}) // true
         * @example Object.some([1, 2], function(item) {return item > 2}) // false
         */
        some<T>(iterable: { [key: number]: T }, callback: (value: T, index: number, target: typeof iterable) => boolean, scope?: any): boolean;

        /**
         * 判断指定对象是否至少存在一项满足指定条件。
         * @param iterable 要遍历的对象（不支持函数）。
         * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
         * - param value 当前项的值。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的对象。
         * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 如果至少存在一项满足条件则返回 true，否则返回 false。
         * @example Object.some({a: 1, b: 2}, function(item) {return item > 1}) // true
         * @example Object.some({a: 1, b: 2}, function(item) {return item > 1}) // true
         * @example Object.some({a: 1, b: 2}, function(item) {return item > 2}) // false
         */
        some<T>(iterable: { [key: string]: T }, callback: (value: T, index: string, target: typeof iterable) => boolean, scope?: any): boolean;

        /**
         * 从左往右依次合并对象中的每一项并最终返回一个值。
         * @param iterable 要遍历的对象（不支持函数）。
         * @param callback 对每一项执行的回调函数，每次合并两项为一项。
         * - param previousValue 要合并的前一项。
         * - param currentValue 要合并的当前项。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的对象。
         * - returns 返回合并的结果。
         * @param initialValue 用于合并第一项的初始值。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回合并后的最终结果值。
         * @example Object.reduce([1, 2], function(x, y) {return x + y}) // 3
         * @example Object.reduce([1, 2], function(x, y) {return x + y}, 10) // 13
         */
        reduce<TInput, TOutput>(iterable: { [key: number]: TInput }, callback: (previousValue: TOutput, currentValue: TInput, index: number, target: typeof iterable) => boolean, initialValue?: TOutput, scope?: any): TOutput;

        /**
         * 从左往右依次合并类数组中的每一项并最终返回一个值。
         * @param iterable 要遍历的类数组（不支持函数）。
         * @param callback 对每一项执行的回调函数，每次合并两项为一项。
         * - param previousValue 要合并的前一项。
         * - param currentValue 要合并的当前项。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的类数组。
         * - returns 返回合并的结果。
         * @param initialValue 用于合并第一项的初始值。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回合并后的最终结果值。
         * @example Object.reduce({a: 1, b: 2}, function(x, y) {return x + y}) // 3
         * @example Object.reduce({a: 1, b: 2}, function(x, y) {return x + y}, 10) // 13
         */
        reduce<TInput, TOutput>(iterable: { [key: string]: TInput }, callback: (previousValue: TOutput, currentValue: TInput, index: string, target: typeof iterable) => boolean, initialValue?: TOutput, scope?: any): TOutput;

        /**
         * 从右往左依次合并对象中的每一项并最终返回一个值。
         * @param iterable 要遍历的对象（不支持函数）。
         * @param callback 对每一项执行的回调函数，每次合并两项为一项。
         * - param previousValue 要合并的前一项。
         * - param currentValue 要合并的当前项。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的对象。
         * - returns 返回合并的结果。
         * @param initialValue 用于合并第一项的初始值。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回合并后的最终结果值。
         * @example Object.reduceRight([1, 2], function(x, y) {return x + y}) // 3
         * @example Object.reduceRight([1, 2], function(x, y) {return x + y}, 10) // 13
         */
        reduceRight<TInput, TOutput>(iterable: { [key: number]: TInput }, callback: (previousValue: TOutput, currentValue: TInput, index: number, target: typeof iterable) => boolean, initialValue?: TOutput, scope?: any): TOutput;

        /**
         * 从右往左依次合并类数组中的每一项并最终返回一个值。
         * @param iterable 要遍历的类数组（不支持函数）。
         * @param callback 对每一项执行的回调函数，每次合并两项为一项。
         * - param previousValue 要合并的前一项。
         * - param currentValue 要合并的当前项。
         * - param index 当前项的索引或键。
         * - param target 当前正在遍历的类数组。
         * - returns 返回合并的结果。
         * @param initialValue 用于合并第一项的初始值。
         * @param scope 设置 *callback* 执行时 this 的值。
         * @returns 返回合并后的最终结果值。
         * @example Object.reduceRight({a: 1, b: 2}, function(x, y) {return x + y}) // 3
         * @example Object.reduceRight({a: 1, b: 2}, function(x, y) {return x + y}, 10) // 13
         */
        reduceRight<TInput, TOutput>(iterable: { [key: string]: TInput }, callback: (previousValue: TOutput, currentValue: TInput, index: string, target: typeof iterable) => boolean, initialValue?: TOutput, scope?: any): TOutput;

        // #endregion

        // #region 对象扩展

        /**
         * 复制对象的所有新属性到目标对象。
         * @param target 复制的目标对象。
         * @param sources 复制的源对象。
         * @returns 返回 *target*。
         * @example Object.assignIf({a: 1}, {b: 2}) // {a: 1, b: 2}
         * @example Object.assignIf({a: 1}, {b: 2}, {b: 3}) // {a: 1, b: 2}
         */
        assignIf<T>(target: T, ...sources: any[]): T;

        /**
         * 返回第一个不为空的值。
         * @param objs 要检测的对象。
         * @returns 返回第一个不为空的值。如果都为空则返回 undefined。
         * @example Object.pick(undefined, null, 1) // 1
         */
        pick(...objs: any[]): any;

        /**
         * 返回对象中指定值对应的第一个键。
         * @param obj 要搜索的对象。
         * @param value 要查找的值。
         * @returns 返回匹配的第一个键，如果不存在匹配的值则返回 null。
         * @example Object.keyOf({a:1, b:1}, 1) // "a"
         */
        keyOf(obj: any, value: any): string;

        /**
         * 判断一个对象是否是引用对象。
         * @param obj 要判断的对象。
         * @returns 如果 *obj* 是引用变量，则返回 true，否则返回 false。
         * @remark 此函数等效于 `obj !== null && typeof obj === "object"`
         * @example Object.isObject({}) // true
         * @example Object.isObject(null) // false
         */
        isObject(obj: any): boolean;

        /**
         * 判断一个对象是否为空。
         * @param obj 要判断的对象。
         * @returns 如果 *obj* 是 null、undefined、false、空字符串或空数组，则返回 true，否则返回 false。
         * @example Object.isEmpty(null) // true
         * @example Object.isEmpty(undefined) // true
         * @example Object.isEmpty("") // true
         * @example Object.isEmpty(" ") // false
         * @example Object.isEmpty([]) // true
         * @example Object.isEmpty({}) // false
         */
        isEmpty(obj: any): boolean;

        /**
         * 在对象指定键之前插入一个键值对。
         * @param obj 要插入的对象。
         * @param refKey 插入的位置。新键值对将插入在指定的键前。如果指定键不存在则插入到末尾。
         * @param newKey 新插入的键。
         * @param newValue 新插入的值。
         * @returns 返回 *obj*。
         * @example Object.insertBefore({a:1}, 'a', 'b', 2) // {b:2, a: 1}
         */
        insertBefore(obj: any, refKey: string, newKey: string, newValue: any);

        /**
         * 设置对象指定属性的值。
         * @param obj 要获取的对象。
         * @param prop 要获取的属性表达式。如 `a.b[0]`。
         * @returns 返回属性值。如果属性不存在则返回 undefined。
         * @example Object.get({a: {b: 1}}, "a.b") // 1
         */
        get(obj: any, prop: string): any;

        /**
         * 深拷贝一个对象，返回和原对象无引用关系的副本。
         * @param obj 要复制的对象。
         * @returns 返回新对象。
         * @remark
         * > 注意：出于性能考虑，`Object.clone` 不会深拷贝函数。
         * @example Object.clone({a: 3, b: [5]}) // {a: 3, b: [5]}
         */
        clone<T>(obj: T): T;

        /**
         * 比较两个引用对象的内容是否相同。
         * @param objX 要比较的第一个对象。
         * @param objY 要比较的第二个对象。
         * @returns 如果比较的对象相同则返回 true，否则返回 false。
         * @example Object.deepEqual([], []) // true
         */
        deepEqual(objX: any, objY: any): boolean;

        // #endregion

    }

}

// #region 语言自带

export module assignSimple {

    /**
     * 复制对象的所有属性到目标对象。
     * @param target 复制的目标对象。
     * @param sources 复制的源对象。
     * @returns 返回 *target*。
     * @example Object.assign({a: 1}, {b: 2}) // {a: 1, b: 2}
     * @since ES6
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     */
    Object.assign = Object.assign || function <T>(target: T, source: any) {
        for (const key in source) {
            target[key] = source[key];
        }
        return target;
    };

}

export module assign {

    /**
     * 复制对象的所有属性到目标对象。
     * @param target 复制的目标对象。
     * @param sources 复制的源对象。
     * @returns 返回 *target*。
     * @example Object.assign({a: 1}, {b: 2}) // {a: 1, b: 2}
     * @example Object.assign({a: 1}, {a: 2}) // {a: 2}
     * @example Object.assign({a: 1}, {b: 2}, {b: 3}) // {a: 1, b: 3}
     * @since ES6
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     */
    Object.assign = Object.assign || function <T>(target: T) {
        for (let i = 1; i < arguments.length; i++) {
            const source = arguments[i];
            for (const key in source) {
                target[key] = source[key];
            }
        }
        return target;
    };

}

export module keys {

    /**
     * 获取对象的所有键。
     * @param obj 要获取的对象。
     * @returns 返回所有键组成的数组。
     * @example Object.keys({a: 3, b: 5}) // ["a", "b"]
     * @since ES5
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
     * @see values
     */
    Object.keys = Object.keys || function (obj: any) {
        let result = [];
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result.push(key);
            }
        }
        return result;
    };

}

export module values {

    /**
     * 获取对象的所有值。
     * @param obj 要获取的对象。
     * @returns 返回所有值组成的数组。
     * @example Object.values({a: 3, b: 5}) // [3, 5]
     * @since ES7
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     * @see keys
     */
    Object.values = Object.values || function (obj: any) {
        let result = [];
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result.push(obj[key]);
            }
        }
        return result;
    };

}

// #endregion

// #region 模拟数组

export module each {

    /**
     * 遍历指定类数组或对象，并对每一项执行 *callback*。
     * @param iterable 要遍历的类数组或对象（不支持函数）。
     * @param callback 对每一项执行的回调函数。
     * - param value 当前项的值。
     * - param index 当前项的索引或键。
     * - param target 当前正在遍历的类数组或对象。
     * - returns 函数可以返回 false 以终止循环。
     * @param scope 设置 *callback* 执行时 this 的值。
     * @returns 如果循环是因为 *callback* 返回 false 而中止，则返回 false，否则返回 true。
     * @example Object.each({a: 1, b: 2}, console.log, console); // 打印 'a  1' 和 'b  2'
     * @example Object.each(["a", "b"], console.log, console); // 打印 '0  a' 和 '1  b'
     */
    Object.each = function (iterable: any, callback: (value: any, index: number | string, target: any) => boolean | void, scope?: any) {

        // 普通对象使用 for( in ) , 数组用 0 -> length 。
        if (iterable && typeof iterable.length === "number") {
            const length = iterable.length;
            for (let i = 0; i < length; i++) {
                if (callback.call(scope, iterable[i], i, iterable) === false) {
                    return false;
                }
            }
        } else {
            for (let i in iterable) {
                if (callback.call(scope, iterable[i], i, iterable) === false) {
                    return false;
                }
            }
        }

        return true;
    };

}

export module filter {

    /**
     * 筛选指定类数组或对象中符合要求的项并组成一个新数组或对象。
     * @param iterable 要遍历的类数组或对象（不支持函数）。
     * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
     * - param value 当前项的值。
     * - param index 当前项的索引或键。
     * - param target 当前正在遍历的类数组或对象。
     * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
     * @param scope 设置 *callback* 执行时 this 的值。
     * @returns 返回一个新数组或对象。
     * @example Object.filter([1, 2], function(item){return item > 1;}) // [2]
     * @example Object.filter({a: 1, b: 2}, function(item){ return item > 1; }) // {b:2}
     */
    Object.filter = function (iterable: any, callback: (value: any, index: number | string, target: any) => boolean, scope?: any) {

        let result;

        // 普通对象使用 for( in ) , 数组用 0 -> length 。
        if (iterable && typeof iterable.length === "number") {
            result = [];
            const length = iterable.length;
            for (let i = 0; i < length; i++) {
                if ((i in this) && callback.call(scope, iterable[i], i, iterable)) {
                    result.push(iterable[i]);
                }
            }
        } else {
            result = {};
            for (let i in iterable) {
                if (callback.call(scope, iterable[i], i, iterable)) {
                    result[i] = iterable[i];
                }
            }
        }

        // 返回目标。
        return result;
    };

}

export module map {

    /**
     * 遍历指定类数组或对象，并对每一项执行 *callback*，然后返回每个结果组成的新数组或对象。
     * @param iterable 要遍历的类数组或对象（不支持函数）。
     * @param callback 对每一项执行的回调函数，用于计算每一项的返回值。
     * - param value 当前项的值。
     * - param index 当前项的索引或键。
     * - param target 当前正在遍历的类数组或对象。
     * - returns 返回结果。
     * @param scope 设置 *callback* 执行时 this 的值。
     * @returns 返回一个新数组或对象。
     * @example Object.map(["a", "b"], function(a){ return a + a; }) // ["aa", "bb"]
     * @example Object.map({length: 1, "0": "a"}, function(a){ return a + a; }) // ["a"]
     * @example Object.map({a: "a", b: "b"}, function(a){ return a + a; }) // {a: "aa", b: "bb"}
     */
    Object.map = function (iterable: any, callback: (value: any, index: number | string, target: any) => boolean, scope?: any) {
        let result;

        // 普通对象使用 for( in ) , 数组用 0 -> length 。
        if (iterable && typeof iterable.length === "number") {
            result = [];
            const length = iterable.length;
            for (let i = 0; i < length; i++) {
                result[i] = callback.call(scope, iterable[i], i, iterable);
            }
        } else {
            result = {};
            for (let i in iterable) {
                result[i] = callback.call(scope, iterable[i], i, iterable);
            }
        }

        return result;
    };

}

export module every {

    /**
     * 判断指定类数组或对象是否每一项都满足指定条件。
     * @param iterable 要遍历的类数组或对象（不支持函数）。
     * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
     * - param value 当前项的值。
     * - param index 当前项的索引或键。
     * - param target 当前正在遍历的类数组或对象。
     * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
     * @param scope 设置 *callback* 执行时 this 的值。
     * @returns 如果所有项满足条件则返回 true，否则返回 false。
     * @example Object.every([1, 2], function(item) {return item > 0}) // true
     * @example Object.every([1, 2], function(item) {return item > 1}) // false
     * @example Object.every([1, 2], function(item) {return item > 2}) // false
     * @example Object.every({a: 1, b: 2}, function(item) {return item > 0}) // true
     * @example Object.every({a: 1, b: 2}, function(item) {return item > 1}) // false
     * @example Object.every({a: 1, b: 2}, function(item) {return item > 2}) // false
     */
    Object.every = function (iterable: any, callback: (value: any, index: number | string, target: any) => boolean, scope?: any) {

        // 普通对象使用 for( in ) , 数组用 0 -> length 。
        if (iterable && typeof iterable.length === "number") {
            const length = iterable.length;
            for (let i = 0; i < length; i++) {
                if ((i in this) && callback.call(scope, iterable[i], i, iterable)) {
                    return false;
                }
            }
        } else {
            for (let i in iterable) {
                if (callback.call(scope, iterable[i], i, iterable)) {
                    return false;
                }
            }
        }

        return true;
    };

}

export module some {

    /**
     * 判断指定类数组或对象是否至少存在一项满足指定条件。
     * @param iterable 要遍历的类数组或对象（不支持函数）。
     * @param callback 对每一项执行的回调函数，用于确定每一项是否符合条件。
     * - param value 当前项的值。
     * - param index 当前项的索引或键。
     * - param target 当前正在遍历的类数组或对象。
     * - returns 如果当前项符合条件则应该返回 true，否则返回 false。
     * @param scope 设置 *callback* 执行时 this 的值。
     * @returns 如果至少存在一项满足条件则返回 true，否则返回 false。
     * @example Object.some([1, 2], function(item) {return item > 0}) // true
     * @example Object.some([1, 2], function(item) {return item > 1}) // true
     * @example Object.some([1, 2], function(item) {return item > 2}) // false
     * @example Object.some({a: 1, b: 2}, function(item) {return item > 1}) // true
     * @example Object.some({a: 1, b: 2}, function(item) {return item > 1}) // true
     * @example Object.some({a: 1, b: 2}, function(item) {return item > 2}) // false
     */
    Object.some = function (iterable: any, callback: (value: any, index: number | string, target: any) => boolean, scope?: any) {

        // 普通对象使用 for( in ) , 数组用 0 -> length 。
        if (iterable && typeof iterable.length === "number") {
            const length = iterable.length;
            for (let i = 0; i < length; i++) {
                if ((i in this) && callback.call(scope, iterable[i], i, iterable)) {
                    return true;
                }
            }
        } else {
            for (let i in iterable) {
                if (callback.call(scope, iterable[i], i, iterable)) {
                    return true;
                }
            }
        }

        return false;
    };

}

export module reduce {

    /**
     * 从左往右依次合并类数组或对象中的每一项并最终返回一个值。
     * @param iterable 要遍历的类数组或对象（不支持函数）。
     * @param callback 对每一项执行的回调函数，每次合并两项为一项。
     * - param previousValue 要合并的前一项。
     * - param currentValue 要合并的当前项。
     * - param index 当前项的索引或键。
     * - param target 当前正在遍历的类数组或对象。
     * - returns 返回合并的结果。
     * @param initialValue 用于合并第一项的初始值。
     * @param scope 设置 *callback* 执行时 this 的值。
     * @returns 返回合并后的最终结果值。
     * @example Object.reduce([1, 2], function(x, y) {return x + y}) // 3
     * @example Object.reduce([1, 2], function(x, y) {return x + y}, 10) // 13
     * @example Object.reduce({a: 1, b: 2}, function(x, y) {return x + y}) // 3
     * @example Object.reduce({a: 1, b: 2}, function(x, y) {return x + y}, 10) // 13
     */
    Object.reduce = function (iterable: any, callback: (previousValue: any, currentValue: any, index: number | string, target: any) => any, initialValue?: any, scope?: any) {

        let result;
        // 普通对象使用 for( in ) , 数组用 0 -> length 。
        if (iterable && typeof iterable.length === "number") {
            const length = iterable.length;
            result = this[0];
            if (initialValue !== undefined) result = callback.call(scope, initialValue, result, 0, iterable);
            for (let i = 1; i < length; i++) {
                result = callback.call(scope, result, iterable[i], i, iterable);
            }
        } else {
            for (let i in iterable) {
                if (initialValue !== undefined) {
                    result = callback.call(scope, initialValue, iterable[i], i, iterable);
                    initialValue = undefined;
                } else {
                    result = callback.call(scope, result, iterable[i], i, iterable);
                }
            }
        }

        return result;
    };

}

export module reduceRight {

    /**
     * 从左往右依次合并类数组或对象中的每一项并最终返回一个值。
     * @param iterable 要遍历的类数组或对象（不支持函数）。
     * @param callback 对每一项执行的回调函数，每次合并两项为一项。
     * - param previousValue 要合并的前一项。
     * - param currentValue 要合并的当前项。
     * - param index 当前项的索引或键。
     * - param target 当前正在遍历的类数组或对象。
     * - returns 返回合并的结果。
     * @param initialValue 用于合并第一项的初始值。
     * @param scope 设置 *callback* 执行时 this 的值。
     * @returns 返回合并后的最终结果值。
     * @example Object.reduceRight([1, 2], function(x, y) {return x + y}) // 3
     * @example Object.reduceRight([1, 2], function(x, y) {return x + y}, 10) // 13
     * @example Object.reduceRight({a: 1, b: 2}, function(x, y) {return x + y}) // 3
     * @example Object.reduceRight({a: 1, b: 2}, function(x, y) {return x + y}, 10) // 13
     */
    Object.reduceRight = function (iterable: any, callback: (previousValue: any, currentValue: any, index: number | string, target: any) => any, initialValue?: any, scope?: any) {

        let result;
        // 普通对象使用 for( in ) , 数组用 0 -> length 。
        if (iterable && typeof iterable.length === "number") {
            const end = iterable.length - 1;
            result = this[end];
            if (initialValue !== undefined) result = callback.call(scope, initialValue, result, end, iterable);
            for (let i = end - 1; i >= 0; i--) {
                result = callback.call(scope, result, iterable[i], i, iterable);
            }
        } else {
            let keys = [];
            for (let i in iterable) {
                keys.push(i);
            }
            result = Object.reduceRight(keys, (previousKey: any, currentKey: any) => callback(iterable[previousKey], iterable[currentKey], currentKey, iterable));
        }

        return result;
    };

}

// #endregion

// #region 对象扩展

export module assignIf {

    /**
     * 复制对象的所有新属性到目标对象。
     * @param target 复制的目标对象。
     * @param sources 复制的源对象。
     * @returns 返回 *target*。
     * @example Object.assignIf({a: 1}, {b: 2}) // {a: 1, b: 2}
     * @example Object.assignIf({a: 1}, {b: 2}, {b: 3}) // {a: 1, b: 2}
     */
    Object.assignIf = function (target) {
        // #assert target != null
        for (let i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (target[key] === undefined) {
                    target[key] = arguments[i][key];
                }
            }
        }
        return target;
    };

}

/**
 * 比较两个引用对象的内容是否相同。
 * @param objX 要比较的第一个对象。
 * @param objY 要比较的第二个对象。
 * @returns 如果比较的对象相同则返回 true，否则返回 false。
 * @example Object.deepEqual([], []) // true
 */
Object.deepEqual = function (objX: any, objY: any) {
    if (objX && objY && typeof objX === "object" && typeof objY === "object") {
        for (let key in objX) {
            if (!Object.deepEqual(objX[key], objY[key])) {
                return false;
            }
        }
        return true;
    }

    return objX === objY;
};

/**
 * 深拷贝一个对象，返回和原对象无引用关系的副本。
 * @param obj 要复制的对象。
 * @returns 返回新对象。
 * @remark
 * > 注意：出于性能考虑，`Object.clone` 不会深拷贝函数和正则表达式。
 * @example Object.clone({a: 3, b: [5]}) // {a: 3, b: [5]}
 */
Object.clone = function (obj: any) {
    if (obj && typeof obj === 'object') {
        if (obj instanceof Array) {
            let newObj = [];
            for (let i = 0; i < obj.length; i++) {
                newObj[i] = Object.clone(obj[i]);
            }
            obj = newObj;
        } else if (obj instanceof Date) {
            obj = new Date(+obj);
        } else if (!(obj instanceof RegExp)) {
            let newObj = {};
            for (let i in obj) {
                newObj[i] = Object.clone(obj[i]);
            }
            obj = newObj;
        }
    }
    return obj;
};

/**
 * 设置对象指定属性的值。
 * @param obj 要获取的对象。
 * @param prop 要获取的属性表达式。如 `a.b[0]`。
 * @returns 返回属性值。如果属性不存在则返回 undefined。
 * @example Object.get({a: {b: 1}}, "a.b") // 1
 */
Object.get = function (obj: any, prop: string) {
    prop.replace(/\.?\s*([^\.\[]+)|\[\s*([^\]]*)\s*\]/g, (_: string, propName: string, indexer: string) => {
        if (obj) obj = obj[propName || indexer];
        return "";
    });
    return obj;
};

/**
 * 在对象指定键之前插入一个键值对。
 * @param obj 要插入的对象。
 * @param refKey 插入的位置。新键值对将插入在指定的键前。如果指定键不存在则插入到末尾。
 * @param newKey 新插入的键。
 * @param newValue 新插入的值。
 * @returns 返回 *obj*。
 * @example Object.insertBefore({a:1}, 'a', 'b', 2) // {b:2, a: 1}
 */
Object.insertBefore = function (obj, refKey, newKey, newValue) {
    // #assert obj != null
    let tmpObj;
    for (let key in obj) {
        if (key === refKey) tmpObj = {};
        if (tmpObj) {
            tmpObj[key] = obj[key];
            delete obj[key];
        }
    }
    obj[newKey] = newValue;
    for (let key in tmpObj) {
        obj[key] = tmpObj[key];
    }
    return obj;
};

/**
 * 判断一个对象是否为空。
 * @param obj 要判断的对象。
 * @returns 如果 *obj* 是 null、undefined、false、空字符串或空数组，则返回 true，否则返回 false。
 * @example Object.isEmpty(null) // true
 * @example Object.isEmpty(undefined) // true
 * @example Object.isEmpty("") // true
 * @example Object.isEmpty(" ") // false
 * @example Object.isEmpty([]) // true
 * @example Object.isEmpty({}) // false
 */
Object.isEmpty = function (obj: any) {
    return !obj || obj.length === 0;
};
/**
 * 判断一个对象是否是引用对象。
 * @param obj 要判断的对象。
 * @returns 如果 *obj* 是引用变量，则返回 true，否则返回 false。
 * @remark 此函数等效于 `obj !== null && typeof obj === "object"`
 * @example Object.isObject({}) // true
 * @example Object.isObject(null) // false
 */
Object.isObject = function (obj: any) {
    return obj !== null && typeof obj === "object";
};
/**
 * 返回对象中指定值对应的第一个键。
 * @param obj 要搜索的对象。
 * @param value 要查找的值。
 * @returns 返回匹配的第一个键，如果不存在匹配的值则返回 null。
 * @example Object.keyOf({a:1, b:1}, 1) // "a"
 */
Object.keyOf = function (obj: any, value: any) {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value) {
            return key;
        }
    }
    return null;
};

/**
 * 返回第一个不为空的值。
 * @param objs 要检测的对象。
 * @returns 返回第一个不为空的值。如果都为空则返回 undefined。
 * @example Object.pick(undefined, null, 1) // 1
 */
Object.pick = function () {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
            return arguments[i];
        }
    }
}

/**
 * 设置对象指定属性的值。
 * @param obj 要设置的对象。
 * @param prop 要设置的属性表达式。如 `a.b[0]`。
 * @param value 要设置的值。
 * @returns 返回 *obj*。
 * @example Object.set({}, "a[1].b", 2) // {a:[undefined, {b: 2}]}
 */
Object.set = function (obj: any, prop: string, value: any) {
    if (obj == null) obj = {};

    let t = obj;
    prop.replace(/\.?\s*([^\.\[]+)|\[\s*([^\]]*)\s*\]/g, (source: string, propName: string, indexer: string, index: number) => {
        let key = propName || indexer;
        if (index + source.length === prop.length) {
            t[key] = value;
        } else {
            if (t[key] == null) t[key] = propName ? {} : [];
            t = t[key];
        }
        return "";
    });

    return obj;
};

/**
 * 获取对象指定键列表的子集。
 * @param obj 要处理的对象。
 * @param keys 要获取的键列表。
 * @returns 返回新对象。
 * @example Object.subset({a: 1, b: 2}, ['a']) // {a: 1}
 */
Object.subset = function (obj: any, keys: string[]) {
    let result = {};
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] in obj) {
            result[keys[i]] = obj[keys[i]];
        }
    }
    return result;
}

/**
 * 计算对象的属性数。
 * @param obj 要处理的对象。
 * @returns 返回对象自身的属性数，不包含原型属性。
 * @example Object.size({a: 1, b: 2}) // 2
 * @example Object.size([0, 1]) // 2
 */
Object.size = function (obj: any) {
    let result = 0;
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result++;
        }
    }
    return result;
};

/**
 * 获取指定对象的类型。
 * @param obj 要判断的对象。
 * @returns 返回类型字符串。
 * @example Object.type(null) // "null"
 * @example Object.type(undefined) // "undefined"
 * @example Object.type(new Function) // "function"
 * @example Object.type(+'a') // "number"
 * @example Object.type(/a/) // "regexp"
 * @example Object.type([]) // "array"
 */
Object.type = function (obj: any): "string" | "number" | "boolean" | "undefined" | "null" | "array" | "function" | "date" | "regexp" | "error" | "object" {
    let types = Object["_types"];
    if (!types) {
        Object["_types"] = types = {};
        "Boolean Number String Function Array Date RegExp Object Error".replace(/\w+/g, (typeName: string) => types["[object " + typeName + "]"] = typeName.toLowerCase());
    }
    return obj == null ? String(obj) : types[types.toString.call(obj)] || "object";
};

// #endregion
