const XRegExp = require('xregexp');
module.exports = {
    phone: function(number) {
        var interPhone = XRegExp(
            '(?<code>  \\d{2,4} ) -?  # code  \n\
                    (?<number>   \\d{7,11} )     # number   ',
            'x'
        );
        var match = XRegExp.exec(number, interPhone);
        if (!match) {
            return false;
        }
        var regex;
        if (match.code == '852') {
            regex = /^([5|6|8|9])\d{7}$/;
        } else if (match.code == '86') {
            regex = /^1[345678]\d{9}$/;
        } else {
            return true;
        }
        return XRegExp.test(match.number, regex);
    },
    email: function(address) {
        return XRegExp.test(
            address,
            /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
        );
    },
    username: function(user) {
        return XRegExp.test(user, /^[a-z0-9_-]{3,16}$/);
    },
    password: function(pwd) {
        return XRegExp.test(pwd, /^[a-z0-9_-]{6,18}$/);
    }
};
