!(function() {
    function s(n) {
        var r = Object.create(null);
        return function(e) {
            var t = c(e) ? e : JSON.stringify(e);
            return r[t] || (r[t] = n(e));
        };
    }
    var o = s(function(e) {
            return e.replace(/([A-Z])/g, function(e) {
                return '-' + e.toLowerCase();
            });
        }),
        l = Object.prototype.hasOwnProperty,
        d =
            Object.assign ||
            function(e) {
                for (var t = arguments, n = 1; n < arguments.length; n++) {
                    var r = Object(t[n]);
                    for (var i in r) l.call(r, i) && (e[i] = r[i]);
                }
                return e;
            };
    function c(e) {
        return 'string' == typeof e || 'number' == typeof e;
    }
    function p() {}
    function u(e) {
        return 'function' == typeof e;
    }
    function h(e, t, r, i) {
        void 0 === i && (i = p);
        var a = e._hooks[t],
            o = function(t) {
                var e = a[t];
                if (t >= a.length) i(r);
                else if ('function' == typeof e)
                    if (2 === e.length)
                        e(r, function(e) {
                            (r = e), o(t + 1);
                        });
                    else {
                        var n = e(r);
                        (r = void 0 === n ? r : n), o(t + 1);
                    }
                else o(t + 1);
            };
        o(0);
    }
    var f = !0,
        m = f && document.body.clientWidth <= 600,
        g =
            f &&
            window.history &&
            window.history.pushState &&
            window.history.replaceState &&
            !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/),
        n = {};
    function v(e, t) {
        if ((void 0 === t && (t = !1), 'string' == typeof e)) {
            if (void 0 !== window.Vue) return w(e);
            e = t ? w(e) : n[e] || (n[e] = w(e));
        }
        return e;
    }
    var b = f && document,
        y = f && b.body,
        k = f && b.head;
    function w(e, t) {
        return t ? e.querySelector(t) : b.querySelector(e);
    }
    function x(e, t) {
        return [].slice.call(t ? e.querySelectorAll(t) : b.querySelectorAll(e));
    }
    function _(e, t) {
        return (e = b.createElement(e)), t && (e.innerHTML = t), e;
    }
    function S(e, t) {
        return e.appendChild(t);
    }
    function A(e, t) {
        return e.insertBefore(t, e.children[0]);
    }
    function C(e, t, n) {
        u(t) ? window.addEventListener(e, t) : e.addEventListener(t, n);
    }
    function E(e, t, n) {
        u(t) ? window.removeEventListener(e, t) : e.removeEventListener(t, n);
    }
    function $(e, t, n) {
        e && e.classList[n ? t : 'toggle'](n || t);
    }
    var L,
        T,
        e = Object.freeze({
            getNode: v,
            $: b,
            body: y,
            head: k,
            find: w,
            findAll: x,
            create: _,
            appendTo: S,
            before: A,
            on: C,
            off: E,
            toggleClass: $,
            style: function(e) {
                S(k, _('style', e));
            },
        });
    function R(e, t) {
        if ((void 0 === t && (t = '<ul class="app-sub-sidebar">{inner}</ul>'), !e || !e.length)) return '';
        var n = '';
        return (
            e.forEach(function(e) {
                (n += '<li><a class="section-link" href="' + e.slug + '">' + e.title + '</a></li>'),
                    e.children && (n += R(e.children, t));
            }),
            t.replace('{inner}', n)
        );
    }
    function r(e, t) {
        return '<p class="' + e + '">' + t.slice(5).trim() + '</p>';
    }
    function P(e) {
        var t,
            n,
            r = e.loaded,
            i = e.total,
            a = e.step;
        !L && ((n = _('div')).classList.add('progress'), S(y, n), (L = n)),
            (t = a ? (80 < (t = parseInt(L.style.width || 0, 10) + a) ? 80 : t) : Math.floor((r / i) * 100)),
            (L.style.opacity = 1),
            (L.style.width = 95 <= t ? '100%' : t + '%'),
            95 <= t &&
                (clearTimeout(T),
                (T = setTimeout(function(e) {
                    (L.style.opacity = 0), (L.style.width = '0%');
                }, 200)));
    }
    var O = {};
    function F(a, e, t) {
        void 0 === e && (e = !1), void 0 === t && (t = {});
        var o = new XMLHttpRequest(),
            n = function() {
                o.addEventListener.apply(o, arguments);
            },
            r = O[a];
        if (r)
            return {
                then: function(e) {
                    return e(r.content, r.opt);
                },
                abort: p,
            };
        for (var i in (o.open('GET', a), t)) l.call(t, i) && o.setRequestHeader(i, t[i]);
        return (
            o.send(),
            {
                then: function(r, i) {
                    if ((void 0 === i && (i = p), e)) {
                        var t = setInterval(function(e) {
                            return P({ step: Math.floor(5 * Math.random() + 1) });
                        }, 500);
                        n('progress', P),
                            n('loadend', function(e) {
                                P(e), clearInterval(t);
                            });
                    }
                    n('error', i),
                        n('load', function(e) {
                            var t = e.target;
                            if (400 <= t.status) i(t);
                            else {
                                var n = (O[a] = {
                                    content: t.response,
                                    opt: { updatedAt: o.getResponseHeader('last-modified') },
                                });
                                r(n.content, n.opt);
                            }
                        });
                },
                abort: function(e) {
                    return 4 !== o.readyState && o.abort();
                },
            }
        );
    }
    function N(e, t) {
        e.innerHTML = e.innerHTML.replace(/var\(\s*--theme-color.*?\)/g, t);
    }
    var j = /([^{]*?)\w(?=\})/g,
        z = {
            YYYY: 'getFullYear',
            YY: 'getYear',
            MM: function(e) {
                return e.getMonth() + 1;
            },
            DD: 'getDate',
            HH: 'getHours',
            mm: 'getMinutes',
            ss: 'getSeconds',
        };
    var t =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : {};
    function i(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    var M = i(function(m, e) {
            !(function(e) {
                var y = {
                    newline: /^\n+/,
                    code: /^( {4}[^\n]+\n*)+/,
                    fences: d,
                    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
                    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
                    nptable: d,
                    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
                    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
                    html:
                        '^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$))',
                    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
                    table: d,
                    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
                    paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
                    text: /^[^\n]+/,
                };
                function l(e) {
                    (this.tokens = []),
                        (this.tokens.links = Object.create(null)),
                        (this.options = e || f.defaults),
                        (this.rules = y.normal),
                        this.options.pedantic
                            ? (this.rules = y.pedantic)
                            : this.options.gfm &&
                              (this.options.tables ? (this.rules = y.tables) : (this.rules = y.gfm));
                }
                (y._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/),
                    (y._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/),
                    (y.def = t(y.def)
                        .replace('label', y._label)
                        .replace('title', y._title)
                        .getRegex()),
                    (y.bullet = /(?:[*+-]|\d+\.)/),
                    (y.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/),
                    (y.item = t(y.item, 'gm')
                        .replace(/bull/g, y.bullet)
                        .getRegex()),
                    (y.list = t(y.list)
                        .replace(/bull/g, y.bullet)
                        .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
                        .replace('def', '\\n+(?=' + y.def.source + ')')
                        .getRegex()),
                    (y._tag =
                        'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
                    (y._comment = /<!--(?!-?>)[\s\S]*?-->/),
                    (y.html = t(y.html, 'i')
                        .replace('comment', y._comment)
                        .replace('tag', y._tag)
                        .replace(
                            'attribute',
                            / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
                        )
                        .getRegex()),
                    (y.paragraph = t(y.paragraph)
                        .replace('hr', y.hr)
                        .replace('heading', y.heading)
                        .replace('lheading', y.lheading)
                        .replace('tag', y._tag)
                        .getRegex()),
                    (y.blockquote = t(y.blockquote)
                        .replace('paragraph', y.paragraph)
                        .getRegex()),
                    (y.normal = g({}, y)),
                    (y.gfm = g({}, y.normal, {
                        fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
                        paragraph: /^/,
                        heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/,
                    })),
                    (y.gfm.paragraph = t(y.paragraph)
                        .replace(
                            '(?!',
                            '(?!' +
                                y.gfm.fences.source.replace('\\1', '\\2') +
                                '|' +
                                y.list.source.replace('\\1', '\\3') +
                                '|',
                        )
                        .getRegex()),
                    (y.tables = g({}, y.gfm, {
                        nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
                        table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/,
                    })),
                    (y.pedantic = g({}, y.normal, {
                        html: t(
                            '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))',
                        )
                            .replace('comment', y._comment)
                            .replace(
                                /tag/g,
                                '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b',
                            )
                            .getRegex(),
                        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
                    })),
                    (l.rules = y),
                    (l.lex = function(e, t) {
                        return new l(t).lex(e);
                    }),
                    (l.prototype.lex = function(e) {
                        return (
                            (e = e
                                .replace(/\r\n|\r/g, '\n')
                                .replace(/\t/g, '    ')
                                .replace(/\u00a0/g, ' ')
                                .replace(/\u2424/g, '\n')),
                            this.token(e, !0)
                        );
                    }),
                    (l.prototype.token = function(e, t) {
                        var n,
                            r,
                            i,
                            a,
                            o,
                            s,
                            l,
                            c,
                            u,
                            p,
                            h,
                            d,
                            g,
                            f,
                            m,
                            v,
                            b = this;
                        for (e = e.replace(/^ +$/gm, ''); e; )
                            if (
                                ((i = b.rules.newline.exec(e)) &&
                                    ((e = e.substring(i[0].length)),
                                    1 < i[0].length && b.tokens.push({ type: 'space' })),
                                (i = b.rules.code.exec(e)))
                            )
                                (e = e.substring(i[0].length)),
                                    (i = i[0].replace(/^ {4}/gm, '')),
                                    b.tokens.push({
                                        type: 'code',
                                        text: b.options.pedantic ? i : w(i, '\n'),
                                    });
                            else if ((i = b.rules.fences.exec(e)))
                                (e = e.substring(i[0].length)),
                                    b.tokens.push({ type: 'code', lang: i[2], text: i[3] || '' });
                            else if ((i = b.rules.heading.exec(e)))
                                (e = e.substring(i[0].length)),
                                    b.tokens.push({
                                        type: 'heading',
                                        depth: i[1].length,
                                        text: i[2],
                                    });
                            else if (
                                t &&
                                (i = b.rules.nptable.exec(e)) &&
                                (s = {
                                    type: 'table',
                                    header: k(i[1].replace(/^ *| *\| *$/g, '')),
                                    align: i[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                                    cells: i[3] ? i[3].replace(/\n$/, '').split('\n') : [],
                                }).header.length === s.align.length
                            ) {
                                for (e = e.substring(i[0].length), h = 0; h < s.align.length; h++)
                                    /^ *-+: *$/.test(s.align[h])
                                        ? (s.align[h] = 'right')
                                        : /^ *:-+: *$/.test(s.align[h])
                                        ? (s.align[h] = 'center')
                                        : /^ *:-+ *$/.test(s.align[h])
                                        ? (s.align[h] = 'left')
                                        : (s.align[h] = null);
                                for (h = 0; h < s.cells.length; h++) s.cells[h] = k(s.cells[h], s.header.length);
                                b.tokens.push(s);
                            } else if ((i = b.rules.hr.exec(e)))
                                (e = e.substring(i[0].length)), b.tokens.push({ type: 'hr' });
                            else if ((i = b.rules.blockquote.exec(e)))
                                (e = e.substring(i[0].length)),
                                    b.tokens.push({ type: 'blockquote_start' }),
                                    (i = i[0].replace(/^ *> ?/gm, '')),
                                    b.token(i, t),
                                    b.tokens.push({ type: 'blockquote_end' });
                            else if ((i = b.rules.list.exec(e))) {
                                for (
                                    e = e.substring(i[0].length),
                                        l = {
                                            type: 'list_start',
                                            ordered: (f = 1 < (a = i[2]).length),
                                            start: f ? +a : '',
                                            loose: !1,
                                        },
                                        b.tokens.push(l),
                                        n = !(c = []),
                                        g = (i = i[0].match(b.rules.item)).length,
                                        h = 0;
                                    h < g;
                                    h++
                                )
                                    (p = (s = i[h]).length),
                                        ~(s = s.replace(/^ *([*+-]|\d+\.) +/, '')).indexOf('\n ') &&
                                            ((p -= s.length),
                                            (s = b.options.pedantic
                                                ? s.replace(/^ {1,4}/gm, '')
                                                : s.replace(new RegExp('^ {1,' + p + '}', 'gm'), ''))),
                                        b.options.smartLists &&
                                            h !== g - 1 &&
                                            (a === (o = y.bullet.exec(i[h + 1])[0]) ||
                                                (1 < a.length && 1 < o.length) ||
                                                ((e = i.slice(h + 1).join('\n') + e), (h = g - 1))),
                                        (r = n || /\n\n(?!\s*$)/.test(s)),
                                        h !== g - 1 && ((n = '\n' === s.charAt(s.length - 1)), r || (r = n)),
                                        r && (l.loose = !0),
                                        (v = void 0),
                                        (m = /^\[[ xX]\] /.test(s)) &&
                                            ((v = ' ' !== s[1]), (s = s.replace(/^\[[ xX]\] +/, ''))),
                                        (u = {
                                            type: 'list_item_start',
                                            task: m,
                                            checked: v,
                                            loose: r,
                                        }),
                                        c.push(u),
                                        b.tokens.push(u),
                                        b.token(s, !1),
                                        b.tokens.push({ type: 'list_item_end' });
                                if (l.loose) for (g = c.length, h = 0; h < g; h++) c[h].loose = !0;
                                b.tokens.push({ type: 'list_end' });
                            } else if ((i = b.rules.html.exec(e)))
                                (e = e.substring(i[0].length)),
                                    b.tokens.push({
                                        type: b.options.sanitize ? 'paragraph' : 'html',
                                        pre:
                                            !b.options.sanitizer &&
                                            ('pre' === i[1] || 'script' === i[1] || 'style' === i[1]),
                                        text: i[0],
                                    });
                            else if (t && (i = b.rules.def.exec(e)))
                                (e = e.substring(i[0].length)),
                                    i[3] && (i[3] = i[3].substring(1, i[3].length - 1)),
                                    (d = i[1].toLowerCase().replace(/\s+/g, ' ')),
                                    b.tokens.links[d] || (b.tokens.links[d] = { href: i[2], title: i[3] });
                            else if (
                                t &&
                                (i = b.rules.table.exec(e)) &&
                                (s = {
                                    type: 'table',
                                    header: k(i[1].replace(/^ *| *\| *$/g, '')),
                                    align: i[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                                    cells: i[3] ? i[3].replace(/(?: *\| *)?\n$/, '').split('\n') : [],
                                }).header.length === s.align.length
                            ) {
                                for (e = e.substring(i[0].length), h = 0; h < s.align.length; h++)
                                    /^ *-+: *$/.test(s.align[h])
                                        ? (s.align[h] = 'right')
                                        : /^ *:-+: *$/.test(s.align[h])
                                        ? (s.align[h] = 'center')
                                        : /^ *:-+ *$/.test(s.align[h])
                                        ? (s.align[h] = 'left')
                                        : (s.align[h] = null);
                                for (h = 0; h < s.cells.length; h++)
                                    s.cells[h] = k(s.cells[h].replace(/^ *\| *| *\| *$/g, ''), s.header.length);
                                b.tokens.push(s);
                            } else if ((i = b.rules.lheading.exec(e)))
                                (e = e.substring(i[0].length)),
                                    b.tokens.push({
                                        type: 'heading',
                                        depth: '=' === i[2] ? 1 : 2,
                                        text: i[1],
                                    });
                            else if (t && (i = b.rules.paragraph.exec(e)))
                                (e = e.substring(i[0].length)),
                                    b.tokens.push({
                                        type: 'paragraph',
                                        text: '\n' === i[1].charAt(i[1].length - 1) ? i[1].slice(0, -1) : i[1],
                                    });
                            else if ((i = b.rules.text.exec(e)))
                                (e = e.substring(i[0].length)), b.tokens.push({ type: 'text', text: i[0] });
                            else if (e) throw new Error('Infinite loop on byte: ' + e.charCodeAt(0));
                        return this.tokens;
                    });
                var n = {
                    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
                    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
                    url: d,
                    tag:
                        '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
                    link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
                    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
                    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
                    strong: /^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
                    em: /^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
                    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
                    br: /^( {2,}|\\)\n(?!\s*$)/,
                    del: d,
                    text: /^(`+|[^`])[\s\S]*?(?=[\\<!\[`*]|\b_| {2,}\n|$)/,
                };
                function c(e, t) {
                    if (
                        ((this.options = t || f.defaults),
                        (this.links = e),
                        (this.rules = n.normal),
                        (this.renderer = this.options.renderer || new r()),
                        (this.renderer.options = this.options),
                        !this.links)
                    )
                        throw new Error('Tokens array requires a `links` property.');
                    this.options.pedantic
                        ? (this.rules = n.pedantic)
                        : this.options.gfm && (this.options.breaks ? (this.rules = n.breaks) : (this.rules = n.gfm));
                }
                function r(e) {
                    this.options = e || f.defaults;
                }
                function i() {}
                function u(e) {
                    (this.tokens = []),
                        (this.token = null),
                        (this.options = e || f.defaults),
                        (this.options.renderer = this.options.renderer || new r()),
                        (this.renderer = this.options.renderer),
                        (this.renderer.options = this.options);
                }
                function p(e, t) {
                    if (t) {
                        if (p.escapeTest.test(e))
                            return e.replace(p.escapeReplace, function(e) {
                                return p.replacements[e];
                            });
                    } else if (p.escapeTestNoEncode.test(e))
                        return e.replace(p.escapeReplaceNoEncode, function(e) {
                            return p.replacements[e];
                        });
                    return e;
                }
                function h(e) {
                    return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, function(e, t) {
                        return 'colon' === (t = t.toLowerCase())
                            ? ':'
                            : '#' === t.charAt(0)
                            ? 'x' === t.charAt(1)
                                ? String.fromCharCode(parseInt(t.substring(2), 16))
                                : String.fromCharCode(+t.substring(1))
                            : '';
                    });
                }
                function t(n, e) {
                    return (
                        (n = n.source || n),
                        (e = e || ''),
                        {
                            replace: function(e, t) {
                                return (
                                    (t = (t = t.source || t).replace(/(^|[^\[])\^/g, '$1')), (n = n.replace(e, t)), this
                                );
                            },
                            getRegex: function() {
                                return new RegExp(n, e);
                            },
                        }
                    );
                }
                function a(e, t) {
                    return (
                        o[' ' + e] ||
                            (/^[^:]+:\/*[^/]*$/.test(e) ? (o[' ' + e] = e + '/') : (o[' ' + e] = w(e, '/', !0))),
                        (e = o[' ' + e]),
                        '//' === t.slice(0, 2)
                            ? e.replace(/:[\s\S]*/, ':') + t
                            : '/' === t.charAt(0)
                            ? e.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + t
                            : e + t
                    );
                }
                (n._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
                    (n._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
                    (n._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
                    (n.autolink = t(n.autolink)
                        .replace('scheme', n._scheme)
                        .replace('email', n._email)
                        .getRegex()),
                    (n._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
                    (n.tag = t(n.tag)
                        .replace('comment', y._comment)
                        .replace('attribute', n._attribute)
                        .getRegex()),
                    (n._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/),
                    (n._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f\\]*\)|[^\s\x00-\x1f()\\])*?)/),
                    (n._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
                    (n.link = t(n.link)
                        .replace('label', n._label)
                        .replace('href', n._href)
                        .replace('title', n._title)
                        .getRegex()),
                    (n.reflink = t(n.reflink)
                        .replace('label', n._label)
                        .getRegex()),
                    (n.normal = g({}, n)),
                    (n.pedantic = g({}, n.normal, {
                        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
                        link: t(/^!?\[(label)\]\((.*?)\)/)
                            .replace('label', n._label)
                            .getRegex(),
                        reflink: t(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                            .replace('label', n._label)
                            .getRegex(),
                    })),
                    (n.gfm = g({}, n.normal, {
                        escape: t(n.escape)
                            .replace('])', '~|])')
                            .getRegex(),
                        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
                        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
                        _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
                        del: /^~+(?=\S)([\s\S]*?\S)~+/,
                        text: t(n.text)
                            .replace(']|', '~]|')
                            .replace('|$', "|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|$")
                            .getRegex(),
                    })),
                    (n.gfm.url = t(n.gfm.url)
                        .replace('email', n.gfm._extended_email)
                        .getRegex()),
                    (n.breaks = g({}, n.gfm, {
                        br: t(n.br)
                            .replace('{2,}', '*')
                            .getRegex(),
                        text: t(n.gfm.text)
                            .replace('{2,}', '*')
                            .getRegex(),
                    })),
                    (c.rules = n),
                    (c.output = function(e, t, n) {
                        return new c(t, n).output(e);
                    }),
                    (c.prototype.output = function(e) {
                        for (var t, n, r, i, a, o, s = this, l = ''; e; )
                            if ((a = s.rules.escape.exec(e))) (e = e.substring(a[0].length)), (l += a[1]);
                            else if ((a = s.rules.autolink.exec(e)))
                                (e = e.substring(a[0].length)),
                                    (r = '@' === a[2] ? 'mailto:' + (n = p(s.mangle(a[1]))) : (n = p(a[1]))),
                                    (l += s.renderer.link(r, null, n));
                            else if (s.inLink || !(a = s.rules.url.exec(e))) {
                                if ((a = s.rules.tag.exec(e)))
                                    !s.inLink && /^<a /i.test(a[0])
                                        ? (s.inLink = !0)
                                        : s.inLink && /^<\/a>/i.test(a[0]) && (s.inLink = !1),
                                        !s.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(a[0])
                                            ? (s.inRawBlock = !0)
                                            : s.inRawBlock &&
                                              /^<\/(pre|code|kbd|script)(\s|>)/i.test(a[0]) &&
                                              (s.inRawBlock = !1),
                                        (e = e.substring(a[0].length)),
                                        (l += s.options.sanitize
                                            ? s.options.sanitizer
                                                ? s.options.sanitizer(a[0])
                                                : p(a[0])
                                            : a[0]);
                                else if ((a = s.rules.link.exec(e)))
                                    (e = e.substring(a[0].length)),
                                        (s.inLink = !0),
                                        (r = a[2]),
                                        (i = s.options.pedantic
                                            ? (t = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))
                                                ? ((r = t[1]), t[3])
                                                : ''
                                            : a[3]
                                            ? a[3].slice(1, -1)
                                            : ''),
                                        (r = r.trim().replace(/^<([\s\S]*)>$/, '$1')),
                                        (l += s.outputLink(a, {
                                            href: c.escapes(r),
                                            title: c.escapes(i),
                                        })),
                                        (s.inLink = !1);
                                else if ((a = s.rules.reflink.exec(e)) || (a = s.rules.nolink.exec(e))) {
                                    if (
                                        ((e = e.substring(a[0].length)),
                                        (t = (a[2] || a[1]).replace(/\s+/g, ' ')),
                                        !(t = s.links[t.toLowerCase()]) || !t.href)
                                    ) {
                                        (l += a[0].charAt(0)), (e = a[0].substring(1) + e);
                                        continue;
                                    }
                                    (s.inLink = !0), (l += s.outputLink(a, t)), (s.inLink = !1);
                                } else if ((a = s.rules.strong.exec(e)))
                                    (e = e.substring(a[0].length)),
                                        (l += s.renderer.strong(s.output(a[4] || a[3] || a[2] || a[1])));
                                else if ((a = s.rules.em.exec(e)))
                                    (e = e.substring(a[0].length)),
                                        (l += s.renderer.em(s.output(a[6] || a[5] || a[4] || a[3] || a[2] || a[1])));
                                else if ((a = s.rules.code.exec(e)))
                                    (e = e.substring(a[0].length)), (l += s.renderer.codespan(p(a[2].trim(), !0)));
                                else if ((a = s.rules.br.exec(e)))
                                    (e = e.substring(a[0].length)), (l += s.renderer.br());
                                else if ((a = s.rules.del.exec(e)))
                                    (e = e.substring(a[0].length)), (l += s.renderer.del(s.output(a[1])));
                                else if ((a = s.rules.text.exec(e)))
                                    (e = e.substring(a[0].length)),
                                        s.inRawBlock
                                            ? (l += s.renderer.text(a[0]))
                                            : (l += s.renderer.text(p(s.smartypants(a[0]))));
                                else if (e) throw new Error('Infinite loop on byte: ' + e.charCodeAt(0));
                            } else {
                                if ('@' === a[2]) r = 'mailto:' + (n = p(a[0]));
                                else {
                                    for (; (o = a[0]), (a[0] = s.rules._backpedal.exec(a[0])[0]), o !== a[0]; );
                                    (n = p(a[0])), (r = 'www.' === a[1] ? 'http://' + n : n);
                                }
                                (e = e.substring(a[0].length)), (l += s.renderer.link(r, null, n));
                            }
                        return l;
                    }),
                    (c.escapes = function(e) {
                        return e ? e.replace(c.rules._escapes, '$1') : e;
                    }),
                    (c.prototype.outputLink = function(e, t) {
                        var n = t.href,
                            r = t.title ? p(t.title) : null;
                        return '!' !== e[0].charAt(0)
                            ? this.renderer.link(n, r, this.output(e[1]))
                            : this.renderer.image(n, r, p(e[1]));
                    }),
                    (c.prototype.smartypants = function(e) {
                        return this.options.smartypants
                            ? e
                                  .replace(/---/g, '—')
                                  .replace(/--/g, '–')
                                  .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
                                  .replace(/'/g, '’')
                                  .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
                                  .replace(/"/g, '”')
                                  .replace(/\.{3}/g, '…')
                            : e;
                    }),
                    (c.prototype.mangle = function(e) {
                        if (!this.options.mangle) return e;
                        for (var t, n = '', r = e.length, i = 0; i < r; i++)
                            (t = e.charCodeAt(i)),
                                0.5 < Math.random() && (t = 'x' + t.toString(16)),
                                (n += '&#' + t + ';');
                        return n;
                    }),
                    (r.prototype.code = function(e, t, n) {
                        if (this.options.highlight) {
                            var r = this.options.highlight(e, t);
                            null != r && r !== e && ((n = !0), (e = r));
                        }
                        return t
                            ? '<pre><code class="' +
                                  this.options.langPrefix +
                                  p(t, !0) +
                                  '">' +
                                  (n ? e : p(e, !0)) +
                                  '</code></pre>\n'
                            : '<pre><code>' + (n ? e : p(e, !0)) + '</code></pre>';
                    }),
                    (r.prototype.blockquote = function(e) {
                        return '<blockquote>\n' + e + '</blockquote>\n';
                    }),
                    (r.prototype.html = function(e) {
                        return e;
                    }),
                    (r.prototype.heading = function(e, t, n) {
                        return this.options.headerIds
                            ? '<h' +
                                  t +
                                  ' id="' +
                                  this.options.headerPrefix +
                                  n.toLowerCase().replace(/[^\w]+/g, '-') +
                                  '">' +
                                  e +
                                  '</h' +
                                  t +
                                  '>\n'
                            : '<h' + t + '>' + e + '</h' + t + '>\n';
                    }),
                    (r.prototype.hr = function() {
                        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
                    }),
                    (r.prototype.list = function(e, t, n) {
                        var r = t ? 'ol' : 'ul';
                        return '<' + r + (t && 1 !== n ? ' start="' + n + '"' : '') + '>\n' + e + '</' + r + '>\n';
                    }),
                    (r.prototype.listitem = function(e) {
                        return '<li>' + e + '</li>\n';
                    }),
                    (r.prototype.checkbox = function(e) {
                        return (
                            '<input ' +
                            (e ? 'checked="" ' : '') +
                            'disabled="" type="checkbox"' +
                            (this.options.xhtml ? ' /' : '') +
                            '> '
                        );
                    }),
                    (r.prototype.paragraph = function(e) {
                        return '<p>' + e + '</p>\n';
                    }),
                    (r.prototype.table = function(e, t) {
                        return (
                            t && (t = '<tbody>' + t + '</tbody>'),
                            '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
                        );
                    }),
                    (r.prototype.tablerow = function(e) {
                        return '<tr>\n' + e + '</tr>\n';
                    }),
                    (r.prototype.tablecell = function(e, t) {
                        var n = t.header ? 'th' : 'td';
                        return (t.align ? '<' + n + ' align="' + t.align + '">' : '<' + n + '>') + e + '</' + n + '>\n';
                    }),
                    (r.prototype.strong = function(e) {
                        return '<strong>' + e + '</strong>';
                    }),
                    (r.prototype.em = function(e) {
                        return '<em>' + e + '</em>';
                    }),
                    (r.prototype.codespan = function(e) {
                        return '<code>' + e + '</code>';
                    }),
                    (r.prototype.br = function() {
                        return this.options.xhtml ? '<br/>' : '<br>';
                    }),
                    (r.prototype.del = function(e) {
                        return '<del>' + e + '</del>';
                    }),
                    (r.prototype.link = function(e, t, n) {
                        if (this.options.sanitize) {
                            try {
                                var r = decodeURIComponent(h(e))
                                    .replace(/[^\w:]/g, '')
                                    .toLowerCase();
                            } catch (e) {
                                return n;
                            }
                            if (
                                0 === r.indexOf('javascript:') ||
                                0 === r.indexOf('vbscript:') ||
                                0 === r.indexOf('data:')
                            )
                                return n;
                        }
                        this.options.baseUrl && !s.test(e) && (e = a(this.options.baseUrl, e));
                        try {
                            e = encodeURI(e).replace(/%25/g, '%');
                        } catch (e) {
                            return n;
                        }
                        var i = '<a href="' + p(e) + '"';
                        return t && (i += ' title="' + t + '"'), (i += '>' + n + '</a>');
                    }),
                    (r.prototype.image = function(e, t, n) {
                        this.options.baseUrl && !s.test(e) && (e = a(this.options.baseUrl, e));
                        var r = '<img src="' + e + '" alt="' + n + '"';
                        return t && (r += ' title="' + t + '"'), (r += this.options.xhtml ? '/>' : '>');
                    }),
                    (r.prototype.text = function(e) {
                        return e;
                    }),
                    (i.prototype.strong = i.prototype.em = i.prototype.codespan = i.prototype.del = i.prototype.text = function(
                        e,
                    ) {
                        return e;
                    }),
                    (i.prototype.link = i.prototype.image = function(e, t, n) {
                        return '' + n;
                    }),
                    (i.prototype.br = function() {
                        return '';
                    }),
                    (u.parse = function(e, t) {
                        return new u(t).parse(e);
                    }),
                    (u.prototype.parse = function(e) {
                        (this.inline = new c(e.links, this.options)),
                            (this.inlineText = new c(e.links, g({}, this.options, { renderer: new i() }))),
                            (this.tokens = e.reverse());
                        for (var t = ''; this.next(); ) t += this.tok();
                        return t;
                    }),
                    (u.prototype.next = function() {
                        return (this.token = this.tokens.pop());
                    }),
                    (u.prototype.peek = function() {
                        return this.tokens[this.tokens.length - 1] || 0;
                    }),
                    (u.prototype.parseText = function() {
                        for (var e = this.token.text; 'text' === this.peek().type; ) e += '\n' + this.next().text;
                        return this.inline.output(e);
                    }),
                    (u.prototype.tok = function() {
                        var e = this;
                        switch (this.token.type) {
                            case 'space':
                                return '';
                            case 'hr':
                                return this.renderer.hr();
                            case 'heading':
                                return this.renderer.heading(
                                    this.inline.output(this.token.text),
                                    this.token.depth,
                                    h(this.inlineText.output(this.token.text)),
                                );
                            case 'code':
                                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                            case 'table':
                                var t,
                                    n,
                                    r,
                                    i,
                                    a = '',
                                    o = '';
                                for (r = '', t = 0; t < this.token.header.length; t++)
                                    r += e.renderer.tablecell(e.inline.output(e.token.header[t]), {
                                        header: !0,
                                        align: e.token.align[t],
                                    });
                                for (a += this.renderer.tablerow(r), t = 0; t < this.token.cells.length; t++) {
                                    for (n = e.token.cells[t], r = '', i = 0; i < n.length; i++)
                                        r += e.renderer.tablecell(e.inline.output(n[i]), {
                                            header: !1,
                                            align: e.token.align[i],
                                        });
                                    o += e.renderer.tablerow(r);
                                }
                                return this.renderer.table(a, o);
                            case 'blockquote_start':
                                for (o = ''; 'blockquote_end' !== this.next().type; ) o += e.tok();
                                return this.renderer.blockquote(o);
                            case 'list_start':
                                o = '';
                                for (
                                    var s = this.token.ordered, l = this.token.start;
                                    'list_end' !== this.next().type;

                                )
                                    o += e.tok();
                                return this.renderer.list(o, s, l);
                            case 'list_item_start':
                                o = '';
                                var c = this.token.loose;
                                for (
                                    this.token.task && (o += this.renderer.checkbox(this.token.checked));
                                    'list_item_end' !== this.next().type;

                                )
                                    o += c || 'text' !== e.token.type ? e.tok() : e.parseText();
                                return this.renderer.listitem(o);
                            case 'html':
                                return this.renderer.html(this.token.text);
                            case 'paragraph':
                                return this.renderer.paragraph(this.inline.output(this.token.text));
                            case 'text':
                                return this.renderer.paragraph(this.parseText());
                        }
                    }),
                    (p.escapeTest = /[&<>"']/),
                    (p.escapeReplace = /[&<>"']/g),
                    (p.replacements = {
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#39;',
                    }),
                    (p.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/),
                    (p.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g);
                var o = {},
                    s = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
                function d() {}
                function g(e) {
                    for (var t, n, r = arguments, i = 1; i < arguments.length; i++)
                        for (n in (t = r[i])) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e;
                }
                function k(e, t) {
                    var n = e
                            .replace(/\|/g, function(e, t, n) {
                                for (var r = !1, i = t; 0 <= --i && '\\' === n[i]; ) r = !r;
                                return r ? '|' : ' |';
                            })
                            .split(/ \|/),
                        r = 0;
                    if (n.length > t) n.splice(t);
                    else for (; n.length < t; ) n.push('');
                    for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, '|');
                    return n;
                }
                function w(e, t, n) {
                    if (0 === e.length) return '';
                    for (var r = 0; r < e.length; ) {
                        var i = e.charAt(e.length - r - 1);
                        if (i !== t || n) {
                            if (i === t || !n) break;
                            r++;
                        } else r++;
                    }
                    return e.substr(0, e.length - r);
                }
                function f(e, n, r) {
                    if (null == e) throw new Error('marked(): input parameter is undefined or null');
                    if ('string' != typeof e)
                        throw new Error(
                            'marked(): input parameter is of type ' +
                                Object.prototype.toString.call(e) +
                                ', string expected',
                        );
                    if (r || 'function' == typeof n) {
                        r || ((r = n), (n = null));
                        var i,
                            a,
                            o = (n = g({}, f.defaults, n || {})).highlight,
                            t = 0;
                        try {
                            i = l.lex(e, n);
                        } catch (e) {
                            return r(e);
                        }
                        a = i.length;
                        var s = function(t) {
                            if (t) return (n.highlight = o), r(t);
                            var e;
                            try {
                                e = u.parse(i, n);
                            } catch (e) {
                                t = e;
                            }
                            return (n.highlight = o), t ? r(t) : r(null, e);
                        };
                        if (!o || o.length < 3) return s();
                        if ((delete n.highlight, !a)) return s();
                        for (; t < i.length; t++)
                            !(function(n) {
                                'code' !== n.type
                                    ? --a || s()
                                    : o(n.text, n.lang, function(e, t) {
                                          return e
                                              ? s(e)
                                              : null == t || t === n.text
                                              ? --a || s()
                                              : ((n.text = t), (n.escaped = !0), void (--a || s()));
                                      });
                            })(i[t]);
                    } else
                        try {
                            return n && (n = g({}, f.defaults, n)), u.parse(l.lex(e, n), n);
                        } catch (e) {
                            if (
                                ((e.message += '\nPlease report this to https://github.com/markedjs/marked.'),
                                (n || f.defaults).silent)
                            )
                                return '<p>An error occurred:</p><pre>' + p(e.message + '', !0) + '</pre>';
                            throw e;
                        }
                }
                (d.exec = d),
                    (f.options = f.setOptions = function(e) {
                        return g(f.defaults, e), f;
                    }),
                    (f.getDefaults = function() {
                        return {
                            baseUrl: null,
                            breaks: !1,
                            gfm: !0,
                            headerIds: !0,
                            headerPrefix: '',
                            highlight: null,
                            langPrefix: 'language-',
                            mangle: !0,
                            pedantic: !1,
                            renderer: new r(),
                            sanitize: !1,
                            sanitizer: null,
                            silent: !1,
                            smartLists: !1,
                            smartypants: !1,
                            tables: !0,
                            xhtml: !1,
                        };
                    }),
                    (f.defaults = f.getDefaults()),
                    (f.Parser = u),
                    (f.parser = u.parse),
                    (f.Renderer = r),
                    (f.TextRenderer = i),
                    (f.Lexer = l),
                    (f.lexer = l.lex),
                    (f.InlineLexer = c),
                    (f.inlineLexer = c.output),
                    (f.parse = f),
                    (m.exports = f);
            })(t || ('undefined' != typeof window && window));
        }),
        a = i(function(e) {
            var c =
                    'undefined' != typeof window
                        ? window
                        : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
                        ? self
                        : {},
                u = (function() {
                    var l = /\blang(?:uage)?-([\w-]+)\b/i,
                        t = 0,
                        P = (c.Prism = {
                            manual: c.Prism && c.Prism.manual,
                            disableWorkerMessageHandler: c.Prism && c.Prism.disableWorkerMessageHandler,
                            util: {
                                encode: function(e) {
                                    return e instanceof o
                                        ? new o(e.type, P.util.encode(e.content), e.alias)
                                        : 'Array' === P.util.type(e)
                                        ? e.map(P.util.encode)
                                        : e
                                              .replace(/&/g, '&amp;')
                                              .replace(/</g, '&lt;')
                                              .replace(/\u00a0/g, ' ');
                                },
                                type: function(e) {
                                    return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
                                },
                                objId: function(e) {
                                    return e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id;
                                },
                                clone: function(e, n) {
                                    var t = P.util.type(e);
                                    switch (((n = n || {}), t)) {
                                        case 'Object':
                                            if (n[P.util.objId(e)]) return n[P.util.objId(e)];
                                            var r = {};
                                            for (var i in ((n[P.util.objId(e)] = r), e))
                                                e.hasOwnProperty(i) && (r[i] = P.util.clone(e[i], n));
                                            return r;
                                        case 'Array':
                                            if (n[P.util.objId(e)]) return n[P.util.objId(e)];
                                            r = [];
                                            return (
                                                (n[P.util.objId(e)] = r),
                                                e.forEach(function(e, t) {
                                                    r[t] = P.util.clone(e, n);
                                                }),
                                                r
                                            );
                                    }
                                    return e;
                                },
                            },
                            languages: {
                                extend: function(e, t) {
                                    var n = P.util.clone(P.languages[e]);
                                    for (var r in t) n[r] = t[r];
                                    return n;
                                },
                                insertBefore: function(n, e, t, r) {
                                    var i = (r = r || P.languages)[n];
                                    if (2 == arguments.length) {
                                        for (var a in (t = e)) t.hasOwnProperty(a) && (i[a] = t[a]);
                                        return i;
                                    }
                                    var o = {};
                                    for (var s in i)
                                        if (i.hasOwnProperty(s)) {
                                            if (s == e) for (var a in t) t.hasOwnProperty(a) && (o[a] = t[a]);
                                            o[s] = i[s];
                                        }
                                    return (
                                        P.languages.DFS(P.languages, function(e, t) {
                                            t === r[n] && e != n && (this[e] = o);
                                        }),
                                        (r[n] = o)
                                    );
                                },
                                DFS: function(e, t, n, r) {
                                    for (var i in ((r = r || {}), e))
                                        e.hasOwnProperty(i) &&
                                            (t.call(e, i, e[i], n || i),
                                            'Object' !== P.util.type(e[i]) || r[P.util.objId(e[i])]
                                                ? 'Array' !== P.util.type(e[i]) ||
                                                  r[P.util.objId(e[i])] ||
                                                  ((r[P.util.objId(e[i])] = !0), P.languages.DFS(e[i], t, i, r))
                                                : ((r[P.util.objId(e[i])] = !0), P.languages.DFS(e[i], t, null, r)));
                                },
                            },
                            plugins: {},
                            highlightAll: function(e, t) {
                                P.highlightAllUnder(document, e, t);
                            },
                            highlightAllUnder: function(e, t, n) {
                                var r = {
                                    callback: n,
                                    selector:
                                        'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                                };
                                P.hooks.run('before-highlightall', r);
                                for (var i, a = r.elements || e.querySelectorAll(r.selector), o = 0; (i = a[o++]); )
                                    P.highlightElement(i, !0 === t, r.callback);
                            },
                            highlightElement: function(e, t, n) {
                                for (var r, i, a = e; a && !l.test(a.className); ) a = a.parentNode;
                                a && ((r = (a.className.match(l) || [, ''])[1].toLowerCase()), (i = P.languages[r])),
                                    (e.className = e.className.replace(l, '').replace(/\s+/g, ' ') + ' language-' + r),
                                    e.parentNode &&
                                        ((a = e.parentNode),
                                        /pre/i.test(a.nodeName) &&
                                            (a.className =
                                                a.className.replace(l, '').replace(/\s+/g, ' ') + ' language-' + r));
                                var o = {
                                    element: e,
                                    language: r,
                                    grammar: i,
                                    code: e.textContent,
                                };
                                if ((P.hooks.run('before-sanity-check', o), !o.code || !o.grammar))
                                    return (
                                        o.code &&
                                            (P.hooks.run('before-highlight', o),
                                            (o.element.textContent = o.code),
                                            P.hooks.run('after-highlight', o)),
                                        void P.hooks.run('complete', o)
                                    );
                                if ((P.hooks.run('before-highlight', o), t && c.Worker)) {
                                    var s = new Worker(P.filename);
                                    (s.onmessage = function(e) {
                                        (o.highlightedCode = e.data),
                                            P.hooks.run('before-insert', o),
                                            (o.element.innerHTML = o.highlightedCode),
                                            n && n.call(o.element),
                                            P.hooks.run('after-highlight', o),
                                            P.hooks.run('complete', o);
                                    }),
                                        s.postMessage(
                                            JSON.stringify({
                                                language: o.language,
                                                code: o.code,
                                                immediateClose: !0,
                                            }),
                                        );
                                } else
                                    (o.highlightedCode = P.highlight(o.code, o.grammar, o.language)),
                                        P.hooks.run('before-insert', o),
                                        (o.element.innerHTML = o.highlightedCode),
                                        n && n.call(e),
                                        P.hooks.run('after-highlight', o),
                                        P.hooks.run('complete', o);
                            },
                            highlight: function(e, t, n) {
                                var r = { code: e, grammar: t, language: n };
                                return (
                                    P.hooks.run('before-tokenize', r),
                                    (r.tokens = P.tokenize(r.code, r.grammar)),
                                    P.hooks.run('after-tokenize', r),
                                    o.stringify(P.util.encode(r.tokens), r.language)
                                );
                            },
                            matchGrammar: function(e, t, n, r, i, a, o) {
                                var s = P.Token;
                                for (var l in n)
                                    if (n.hasOwnProperty(l) && n[l]) {
                                        if (l == o) return;
                                        var c = n[l];
                                        c = 'Array' === P.util.type(c) ? c : [c];
                                        for (var u = 0; u < c.length; ++u) {
                                            var p = c[u],
                                                h = p.inside,
                                                d = !!p.lookbehind,
                                                g = !!p.greedy,
                                                f = 0,
                                                m = p.alias;
                                            if (g && !p.pattern.global) {
                                                var v = p.pattern.toString().match(/[imuy]*$/)[0];
                                                p.pattern = RegExp(p.pattern.source, v + 'g');
                                            }
                                            p = p.pattern || p;
                                            for (var b = r, y = i; b < t.length; y += t[b].length, ++b) {
                                                var k = t[b];
                                                if (t.length > e.length) return;
                                                if (!(k instanceof s)) {
                                                    if (g && b != t.length - 1) {
                                                        if (((p.lastIndex = y), !(C = p.exec(e)))) break;
                                                        for (
                                                            var w = C.index + (d ? C[1].length : 0),
                                                                x = C.index + C[0].length,
                                                                _ = b,
                                                                S = y,
                                                                A = t.length;
                                                            _ < A && (S < x || (!t[_].type && !t[_ - 1].greedy));
                                                            ++_
                                                        )
                                                            (S += t[_].length) <= w && (++b, (y = S));
                                                        if (t[b] instanceof s) continue;
                                                        (E = _ - b), (k = e.slice(y, S)), (C.index -= y);
                                                    } else {
                                                        p.lastIndex = 0;
                                                        var C = p.exec(k),
                                                            E = 1;
                                                    }
                                                    if (C) {
                                                        d && (f = C[1] ? C[1].length : 0);
                                                        x = (w = C.index + f) + (C = C[0].slice(f)).length;
                                                        var $ = k.slice(0, w),
                                                            L = k.slice(x),
                                                            T = [b, E];
                                                        $ && (++b, (y += $.length), T.push($));
                                                        var R = new s(l, h ? P.tokenize(C, h) : C, m, C, g);
                                                        if (
                                                            (T.push(R),
                                                            L && T.push(L),
                                                            Array.prototype.splice.apply(t, T),
                                                            1 != E && P.matchGrammar(e, t, n, b, y, !0, l),
                                                            a)
                                                        )
                                                            break;
                                                    } else if (a) break;
                                                }
                                            }
                                        }
                                    }
                            },
                            tokenize: function(e, t, n) {
                                var r = [e],
                                    i = t.rest;
                                if (i) {
                                    for (var a in i) t[a] = i[a];
                                    delete t.rest;
                                }
                                return P.matchGrammar(e, r, t, 0, 0, !1), r;
                            },
                            hooks: {
                                all: {},
                                add: function(e, t) {
                                    var n = P.hooks.all;
                                    (n[e] = n[e] || []), n[e].push(t);
                                },
                                run: function(e, t) {
                                    var n = P.hooks.all[e];
                                    if (n && n.length) for (var r, i = 0; (r = n[i++]); ) r(t);
                                },
                            },
                        }),
                        o = (P.Token = function(e, t, n, r, i) {
                            (this.type = e),
                                (this.content = t),
                                (this.alias = n),
                                (this.length = 0 | (r || '').length),
                                (this.greedy = !!i);
                        });
                    if (
                        ((o.stringify = function(t, n, e) {
                            if ('string' == typeof t) return t;
                            if ('Array' === P.util.type(t))
                                return t
                                    .map(function(e) {
                                        return o.stringify(e, n, t);
                                    })
                                    .join('');
                            var r = {
                                type: t.type,
                                content: o.stringify(t.content, n, e),
                                tag: 'span',
                                classes: ['token', t.type],
                                attributes: {},
                                language: n,
                                parent: e,
                            };
                            if (t.alias) {
                                var i = 'Array' === P.util.type(t.alias) ? t.alias : [t.alias];
                                Array.prototype.push.apply(r.classes, i);
                            }
                            P.hooks.run('wrap', r);
                            var a = Object.keys(r.attributes)
                                .map(function(e) {
                                    return e + '="' + (r.attributes[e] || '').replace(/"/g, '&quot;') + '"';
                                })
                                .join(' ');
                            return (
                                '<' +
                                r.tag +
                                ' class="' +
                                r.classes.join(' ') +
                                '"' +
                                (a ? ' ' + a : '') +
                                '>' +
                                r.content +
                                '</' +
                                r.tag +
                                '>'
                            );
                        }),
                        !c.document)
                    )
                        return (
                            c.addEventListener &&
                                (P.disableWorkerMessageHandler ||
                                    c.addEventListener(
                                        'message',
                                        function(e) {
                                            var t = JSON.parse(e.data),
                                                n = t.language,
                                                r = t.code,
                                                i = t.immediateClose;
                                            c.postMessage(P.highlight(r, P.languages[n], n)), i && c.close();
                                        },
                                        !1,
                                    )),
                            c.Prism
                        );
                    var e = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
                    return (
                        e &&
                            ((P.filename = e.src),
                            P.manual ||
                                e.hasAttribute('data-manual') ||
                                ('loading' !== document.readyState
                                    ? window.requestAnimationFrame
                                        ? window.requestAnimationFrame(P.highlightAll)
                                        : window.setTimeout(P.highlightAll, 16)
                                    : document.addEventListener('DOMContentLoaded', P.highlightAll))),
                        c.Prism
                    );
                })();
            e.exports && (e.exports = u),
                void 0 !== t && (t.Prism = u),
                (u.languages.markup = {
                    comment: /<!--[\s\S]*?-->/,
                    prolog: /<\?[\s\S]+?\?>/,
                    doctype: /<!DOCTYPE[\s\S]+?>/i,
                    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
                    tag: {
                        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
                        greedy: !0,
                        inside: {
                            tag: {
                                pattern: /^<\/?[^\s>\/]+/i,
                                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
                            },
                            'attr-value': {
                                pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                                inside: {
                                    punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }],
                                },
                            },
                            punctuation: /\/?>/,
                            'attr-name': {
                                pattern: /[^\s>\/]+/,
                                inside: { namespace: /^[^\s>\/:]+:/ },
                            },
                        },
                    },
                    entity: /&#?[\da-z]{1,8};/i,
                }),
                (u.languages.markup.tag.inside['attr-value'].inside.entity = u.languages.markup.entity),
                u.hooks.add('wrap', function(e) {
                    'entity' === e.type && (e.attributes.title = e.content.replace(/&amp;/, '&'));
                }),
                (u.languages.xml = u.languages.markup),
                (u.languages.html = u.languages.markup),
                (u.languages.mathml = u.languages.markup),
                (u.languages.svg = u.languages.markup),
                (u.languages.css = {
                    comment: /\/\*[\s\S]*?\*\//,
                    atrule: {
                        pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
                        inside: { rule: /@[\w-]+/ },
                    },
                    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
                    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
                    string: {
                        pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                        greedy: !0,
                    },
                    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
                    important: /\B!important\b/i,
                    function: /[-a-z0-9]+(?=\()/i,
                    punctuation: /[(){};:]/,
                }),
                (u.languages.css.atrule.inside.rest = u.languages.css),
                u.languages.markup &&
                    (u.languages.insertBefore('markup', 'tag', {
                        style: {
                            pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
                            lookbehind: !0,
                            inside: u.languages.css,
                            alias: 'language-css',
                            greedy: !0,
                        },
                    }),
                    u.languages.insertBefore(
                        'inside',
                        'attr-value',
                        {
                            'style-attr': {
                                pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                                inside: {
                                    'attr-name': {
                                        pattern: /^\s*style/i,
                                        inside: u.languages.markup.tag.inside,
                                    },
                                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                                    'attr-value': { pattern: /.+/i, inside: u.languages.css },
                                },
                                alias: 'language-css',
                            },
                        },
                        u.languages.markup.tag,
                    )),
                (u.languages.clike = {
                    comment: [
                        { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
                        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
                    ],
                    string: {
                        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                        greedy: !0,
                    },
                    'class-name': {
                        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
                        lookbehind: !0,
                        inside: { punctuation: /[.\\]/ },
                    },
                    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
                    boolean: /\b(?:true|false)\b/,
                    function: /[a-z0-9_]+(?=\()/i,
                    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
                    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
                    punctuation: /[{}[\];(),.:]/,
                }),
                (u.languages.javascript = u.languages.extend('clike', {
                    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
                    number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
                    function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
                    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
                })),
                u.languages.insertBefore('javascript', 'keyword', {
                    regex: {
                        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
                        lookbehind: !0,
                        greedy: !0,
                    },
                    'function-variable': {
                        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
                        alias: 'function',
                    },
                    constant: /\b[A-Z][A-Z\d_]*\b/,
                }),
                u.languages.insertBefore('javascript', 'string', {
                    'template-string': {
                        pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
                        greedy: !0,
                        inside: {
                            interpolation: {
                                pattern: /\${[^}]+}/,
                                inside: {
                                    'interpolation-punctuation': {
                                        pattern: /^\${|}$/,
                                        alias: 'punctuation',
                                    },
                                    rest: null,
                                },
                            },
                            string: /[\s\S]+/,
                        },
                    },
                }),
                (u.languages.javascript['template-string'].inside.interpolation.inside.rest = u.languages.javascript),
                u.languages.markup &&
                    u.languages.insertBefore('markup', 'tag', {
                        script: {
                            pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
                            lookbehind: !0,
                            inside: u.languages.javascript,
                            alias: 'language-javascript',
                            greedy: !0,
                        },
                    }),
                (u.languages.js = u.languages.javascript),
                'undefined' != typeof self &&
                    self.Prism &&
                    self.document &&
                    document.querySelector &&
                    ((self.Prism.fileHighlight = function() {
                        var l = {
                            js: 'javascript',
                            py: 'python',
                            rb: 'ruby',
                            ps1: 'powershell',
                            psm1: 'powershell',
                            sh: 'bash',
                            bat: 'batch',
                            h: 'c',
                            tex: 'latex',
                        };
                        Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function(e) {
                            for (
                                var t, n = e.getAttribute('data-src'), r = e, i = /\blang(?:uage)?-([\w-]+)\b/i;
                                r && !i.test(r.className);

                            )
                                r = r.parentNode;
                            if ((r && (t = (e.className.match(i) || [, ''])[1]), !t)) {
                                var a = (n.match(/\.(\w+)$/) || [, ''])[1];
                                t = l[a] || a;
                            }
                            var o = document.createElement('code');
                            (o.className = 'language-' + t),
                                (e.textContent = ''),
                                (o.textContent = 'Loading…'),
                                e.appendChild(o);
                            var s = new XMLHttpRequest();
                            s.open('GET', n, !0),
                                (s.onreadystatechange = function() {
                                    4 == s.readyState &&
                                        (s.status < 400 && s.responseText
                                            ? ((o.textContent = s.responseText), u.highlightElement(o))
                                            : 400 <= s.status
                                            ? (o.textContent =
                                                  '✖ Error ' + s.status + ' while fetching file: ' + s.statusText)
                                            : (o.textContent = '✖ Error: File does not exist or is empty'));
                                }),
                                s.send(null);
                        }),
                            u.plugins.toolbar &&
                                u.plugins.toolbar.registerButton('download-file', function(e) {
                                    var t = e.element.parentNode;
                                    if (
                                        t &&
                                        /pre/i.test(t.nodeName) &&
                                        t.hasAttribute('data-src') &&
                                        t.hasAttribute('data-download-link')
                                    ) {
                                        var n = t.getAttribute('data-src'),
                                            r = document.createElement('a');
                                        return (
                                            (r.textContent = t.getAttribute('data-download-link-label') || 'Download'),
                                            r.setAttribute('download', ''),
                                            (r.href = n),
                                            r
                                        );
                                    }
                                });
                    }),
                    document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight));
        });
    function q(e, r) {
        var i = [],
            a = {};
        return (
            e.forEach(function(e) {
                var t = e.level || 1,
                    n = t - 1;
                r < t || (a[n] ? (a[n].children = (a[n].children || []).concat(e)) : i.push(e), (a[t] = e));
            }),
            i
        );
    }
    var H = {},
        I = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
    function B(e) {
        return e.toLowerCase();
    }
    function U(e) {
        if ('string' != typeof e) return '';
        var t = e
                .trim()
                .replace(/[A-Z]+/g, B)
                .replace(/<[^>\d]+>/g, '')
                .replace(I, '')
                .replace(/\s/g, '-')
                .replace(/-+/g, '-')
                .replace(/^(\d)/, '_$1'),
            n = H[t];
        return (n = l.call(H, t) ? n + 1 : 0), (H[t] = n) && (t = t + '-' + n), t;
    }
    function D(e, t) {
        return (
            '<img class="emoji" src="https://assets-cdn.github.com/images/icons/emoji/' + t + '.png" alt="' + t + '" />'
        );
    }
    U.clear = function() {
        H = {};
    };
    var Z = decodeURIComponent,
        Y = encodeURIComponent;
    function W(e) {
        var n = {};
        return (
            (e = e.trim().replace(/^(\?|#|&)/, '')) &&
                e.split('&').forEach(function(e) {
                    var t = e.replace(/\+/g, ' ').split('=');
                    n[t[0]] = t[1] && Z(t[1]);
                }),
            n
        );
    }
    function G(e, t) {
        void 0 === t && (t = []);
        var n = [];
        for (var r in e) -1 < t.indexOf(r) || n.push(e[r] ? (Y(r) + '=' + Y(e[r])).toLowerCase() : Y(r));
        return n.length ? '?' + n.join('&') : '';
    }
    var X = s(function(e) {
            return /(:|(\/{2}))/g.test(e);
        }),
        Q = s(function(e) {
            return /\/$/g.test(e) ? e : (e = e.match(/(\S*\/)[^/]+$/)) ? e[1] : '';
        }),
        V = s(function(e) {
            return e.replace(/^\/+/, '/').replace(/([^:])\/{2,}/g, '$1/');
        });
    function J() {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        return V(e.join('/'));
    }
    var K = s(function(e) {
        return e.replace('#', '?id=');
    });
    (Prism.languages['markup-templating'] = {}),
        Object.defineProperties(Prism.languages['markup-templating'], {
            buildPlaceholders: {
                value: function(n, r, e, i) {
                    n.language === r &&
                        ((n.tokenStack = []),
                        (n.code = n.code.replace(e, function(e) {
                            if ('function' == typeof i && !i(e)) return e;
                            for (
                                var t = n.tokenStack.length;
                                -1 !== n.code.indexOf('___' + r.toUpperCase() + t + '___');

                            )
                                ++t;
                            return (n.tokenStack[t] = e), '___' + r.toUpperCase() + t + '___';
                        })),
                        (n.grammar = Prism.languages.markup));
                },
            },
            tokenizePlaceholders: {
                value: function(p, h) {
                    if (p.language === h && p.tokenStack) {
                        p.grammar = Prism.languages[h];
                        var d = 0,
                            g = Object.keys(p.tokenStack),
                            f = function(e) {
                                if (!(d >= g.length))
                                    for (var t = 0; t < e.length; t++) {
                                        var n = e[t];
                                        if ('string' == typeof n || (n.content && 'string' == typeof n.content)) {
                                            var r = g[d],
                                                i = p.tokenStack[r],
                                                a = 'string' == typeof n ? n : n.content,
                                                o = a.indexOf('___' + h.toUpperCase() + r + '___');
                                            if (-1 < o) {
                                                ++d;
                                                var s,
                                                    l = a.substring(0, o),
                                                    c = new Prism.Token(
                                                        h,
                                                        Prism.tokenize(i, p.grammar, h),
                                                        'language-' + h,
                                                        i,
                                                    ),
                                                    u = a.substring(o + ('___' + h.toUpperCase() + r + '___').length);
                                                if (
                                                    (l || u
                                                        ? ((s = [l, c, u].filter(function(e) {
                                                              return !!e;
                                                          })),
                                                          f(s))
                                                        : (s = c),
                                                    'string' == typeof n
                                                        ? Array.prototype.splice.apply(e, [t, 1].concat(s))
                                                        : (n.content = s),
                                                    d >= g.length)
                                                )
                                                    break;
                                            }
                                        } else n.content && 'string' != typeof n.content && f(n.content);
                                    }
                            };
                        f(p.tokens);
                    }
                },
            },
        });
    var ee = {};
    function te(e) {
        void 0 === e && (e = '');
        var r = {};
        return (
            e &&
                (e = e
                    .replace(/^'/, '')
                    .replace(/'$/, '')
                    .replace(/:([\w-]+)=?([\w-]+)?/g, function(e, t, n) {
                        return (r[t] = (n && n.replace(/&quot;/g, '')) || !0), '';
                    })
                    .trim()),
            { str: e, config: r }
        );
    }
    var ne = {
            markdown: function(e) {
                return { url: e };
            },
            mermaid: function(e) {
                return { url: e };
            },
            iframe: function(e, t) {
                return {
                    html: '<iframe src="' + e + '" ' + (t || 'width=100% height=400') + '></iframe>',
                };
            },
            video: function(e, t) {
                return {
                    html: '<video src="' + e + '" ' + (t || 'controls') + '>Not Support</video>',
                };
            },
            audio: function(e, t) {
                return {
                    html: '<audio src="' + e + '" ' + (t || 'controls') + '>Not Support</audio>',
                };
            },
            code: function(e, t) {
                var n = e.match(/\.(\w+)$/);
                return 'md' === (n = t || (n && n[1])) && (n = 'markdown'), { url: e, lang: n };
            },
        },
        re = function(i, e) {
            var a = this;
            (this.config = i),
                (this.router = e),
                (this.cacheTree = {}),
                (this.toc = []),
                (this.cacheTOC = {}),
                (this.linkTarget = i.externalLinkTarget || '_blank'),
                (this.contentBase = e.getBasePath());
            var o,
                t = this._initRenderer(),
                n = i.markdown || {};
            (o = u(n) ? n(M, t) : (M.setOptions(d(n, { renderer: d(t, n.renderer) })), M)),
                (this._marked = o),
                (this.compile = function(n) {
                    var r = !0,
                        e = s(function(e) {
                            r = !1;
                            var t = '';
                            return n
                                ? ((t = c(n) ? o(n) : o.parser(n)),
                                  (t = i.noEmoji
                                      ? t
                                      : t
                                            .replace(
                                                /<(pre|template|code)[^>]*?>[\s\S]+?<\/(pre|template|code)>/g,
                                                function(e) {
                                                    return e.replace(/:/g, '__colon__');
                                                },
                                            )
                                            .replace(/:(\w+?):/gi, (f && window.emojify) || D)
                                            .replace(/__colon__/g, ':')),
                                  U.clear(),
                                  t)
                                : n;
                        })(n),
                        t = a.router.parse().file;
                    return r ? (a.toc = a.cacheTOC[t]) : (a.cacheTOC[t] = [].concat(a.toc)), e;
                });
        };
    (re.prototype.compileEmbed = function(e, t) {
        var n,
            r = te(t),
            i = r.str,
            a = r.config;
        if (((t = i), a.include)) {
            var o;
            if ((X(e) || (e = J(this.contentBase, Q(this.router.getCurrentPath()), e)), a.type && (o = ne[a.type])))
                (n = o.call(this, e, t)).type = a.type;
            else {
                var s = 'code';
                /\.(md|markdown)/.test(e)
                    ? (s = 'markdown')
                    : /\.mmd/.test(e)
                    ? (s = 'mermaid')
                    : /\.html?/.test(e)
                    ? (s = 'iframe')
                    : /\.(mp4|ogg)/.test(e)
                    ? (s = 'video')
                    : /\.mp3/.test(e) && (s = 'audio'),
                    ((n = ne[s].call(this, e, t)).type = s);
            }
            return n;
        }
    }),
        (re.prototype._matchNotCompileLink = function(e) {
            for (var t = this.config.noCompileLinks || [], n = 0; n < t.length; n++) {
                var r = t[n];
                if ((ee[r] || (ee[r] = new RegExp('^' + r + '$'))).test(e)) return e;
            }
        }),
        (re.prototype._initRenderer = function() {
            var e = new M.Renderer(),
                s = this.linkTarget,
                u = this.router,
                p = this.contentBase,
                l = this,
                t = {};
            return (
                (t.heading = e.heading = function(e, t) {
                    var n = te(e),
                        r = n.str,
                        i = n.config,
                        a = { level: t, title: r };
                    /{docsify-ignore}/g.test(r) &&
                        ((r = r.replace('{docsify-ignore}', '')), (a.title = r), (a.ignoreSubHeading = !0)),
                        /{docsify-ignore-all}/g.test(r) &&
                            ((r = r.replace('{docsify-ignore-all}', '')), (a.title = r), (a.ignoreAllSubs = !0));
                    var o = U(i.id || r),
                        s = u.toURL(u.getCurrentPath(), { id: o });
                    return (
                        (a.slug = s),
                        l.toc.push(a),
                        '<h' +
                            t +
                            ' id="' +
                            o +
                            '"><a href="' +
                            s +
                            '" data-id="' +
                            o +
                            '" class="anchor"><span>' +
                            r +
                            '</span></a></h' +
                            t +
                            '>'
                    );
                }),
                (t.code = e.code = function(e, t) {
                    return (
                        void 0 === t && (t = ''),
                        (e = e.replace(/@DOCSIFY_QM@/g, '`')),
                        '<pre v-pre data-lang="' +
                            t +
                            '"><code class="lang-' +
                            t +
                            '">' +
                            a.highlight(e, a.languages[t] || a.languages.markup) +
                            '</code></pre>'
                    );
                }),
                (t.link = e.link = function(e, t, n) {
                    void 0 === t && (t = '');
                    var r = '',
                        i = te(t),
                        a = i.str,
                        o = i.config;
                    return (
                        (t = a),
                        X(e) || l._matchNotCompileLink(e) || o.ignore
                            ? (r += 0 === e.indexOf('mailto:') ? '' : ' target="' + s + '"')
                            : (e === l.config.homepage && (e = 'README'), (e = u.toURL(e, null, u.getCurrentPath()))),
                        o.target && (r += ' target=' + o.target),
                        o.disabled && ((r += ' disabled'), (e = 'javascript:void(0)')),
                        t && (r += ' title="' + t + '"'),
                        '<a href="' + e + '"' + r + '>' + n + '</a>'
                    );
                }),
                (t.paragraph = e.paragraph = function(e) {
                    return /^!&gt;/.test(e) ? r('tip', e) : /^\?&gt;/.test(e) ? r('warn', e) : '<p>' + e + '</p>';
                }),
                (t.image = e.image = function(e, t, n) {
                    var r = e,
                        i = '',
                        a = te(t),
                        o = a.str,
                        s = a.config;
                    (t = o), s['no-zoom'] && (i += ' data-no-zoom'), t && (i += ' title="' + t + '"');
                    var l = s.size;
                    if (l) {
                        var c = l.split('x');
                        c[1] ? (i += 'width=' + c[0] + ' height=' + c[1]) : (i += 'width=' + c[0]);
                    }
                    return (
                        X(e) || (r = J(p, Q(u.getCurrentPath()), e)),
                        '<img src="' + r + '"data-origin="' + e + '" alt="' + n + '"' + i + '>'
                    );
                }),
                (e.origin = t),
                e
            );
        }),
        (re.prototype.sidebar = function(e, t) {
            var n = this.router.getCurrentPath(),
                r = '';
            if (e) r = this.compile(e);
            else {
                var i = this.cacheTree[n] || q(this.toc, t);
                (r = R(i, '<ul>{inner}</ul>')), (this.cacheTree[n] = i);
            }
            return r;
        }),
        (re.prototype.subSidebar = function(e) {
            if (e) {
                var t = this.router.getCurrentPath(),
                    n = this.cacheTree,
                    r = this.toc;
                r[0] && r[0].ignoreAllSubs && r.splice(0), r[0] && 1 === r[0].level && r.shift();
                for (var i = 0; i < r.length; i++) r[i].ignoreSubHeading && r.splice(i, 1) && i--;
                var a = n[t] || q(r, e);
                return (n[t] = a), (this.toc = []), R(a);
            }
            this.toc = [];
        }),
        (re.prototype.article = function(e) {
            return this.compile(e);
        }),
        (re.prototype.cover = function(e) {
            var t = this.toc.slice(),
                n = this.compile(e);
            return (this.toc = t.slice()), n;
        });
    var ie = b.title;
    function ae() {
        var e = v('section.cover');
        if (e) {
            var t = e.getBoundingClientRect().height;
            window.pageYOffset >= t || e.classList.contains('hidden')
                ? $(y, 'add', 'sticky')
                : $(y, 'remove', 'sticky');
        }
    }
    function oe(e, t, r, n) {
        var i,
            a = x((t = v(t)), 'a'),
            o = decodeURI(e.toURL(e.getCurrentPath()));
        return (
            a
                .sort(function(e, t) {
                    return t.href.length - e.href.length;
                })
                .forEach(function(e) {
                    var t = e.getAttribute('href'),
                        n = r ? e.parentNode : e;
                    0 !== o.indexOf(t) || i ? $(n, 'remove', 'active') : ((i = e), $(n, 'add', 'active'));
                }),
            n && (b.title = i ? i.title || i.innerText + ' - ' + ie : ie),
            i
        );
    }
    var se = (function() {
        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r);
            }
        }
        return function(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e;
        };
    })();
    var le = (function() {
            function t() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                !(function(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.duration = e.duration || 1e3),
                    (this.ease = e.easing || this._defaultEase),
                    (this.start = e.start),
                    (this.end = e.end),
                    (this.frame = null),
                    (this.next = null),
                    (this.isRunning = !1),
                    (this.events = {}),
                    (this.direction = this.start < this.end ? 'up' : 'down');
            }
            return (
                se(t, [
                    {
                        key: 'begin',
                        value: function() {
                            return (
                                this.isRunning ||
                                    this.next === this.end ||
                                    (this.frame = window.requestAnimationFrame(this._tick.bind(this))),
                                this
                            );
                        },
                    },
                    {
                        key: 'stop',
                        value: function() {
                            return (
                                window.cancelAnimationFrame(this.frame),
                                (this.isRunning = !1),
                                (this.frame = null),
                                (this.timeStart = null),
                                (this.next = null),
                                this
                            );
                        },
                    },
                    {
                        key: 'on',
                        value: function(e, t) {
                            return (this.events[e] = this.events[e] || []), this.events[e].push(t), this;
                        },
                    },
                    {
                        key: 'emit',
                        value: function(e, t) {
                            var n = this,
                                r = this.events[e];
                            r &&
                                r.forEach(function(e) {
                                    return e.call(n, t);
                                });
                        },
                    },
                    {
                        key: '_tick',
                        value: function(e) {
                            this.isRunning = !0;
                            var t = this.next || this.start;
                            this.timeStart || (this.timeStart = e),
                                (this.timeElapsed = e - this.timeStart),
                                (this.next = Math.round(
                                    this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration),
                                )),
                                this._shouldTick(t)
                                    ? (this.emit('tick', this.next),
                                      (this.frame = window.requestAnimationFrame(this._tick.bind(this))))
                                    : (this.emit('tick', this.end), this.emit('done', null));
                        },
                    },
                    {
                        key: '_shouldTick',
                        value: function(e) {
                            return {
                                up: this.next < this.end && e <= this.next,
                                down: this.next > this.end && e >= this.next,
                            }[this.direction];
                        },
                    },
                    {
                        key: '_defaultEase',
                        value: function(e, t, n, r) {
                            return (e /= r / 2) < 1 ? (n / 2) * e * e + t : (-n / 2) * (--e * (e - 2) - 1) + t;
                        },
                    },
                ]),
                t
            );
        })(),
        ce = {},
        ue = !1,
        pe = null,
        he = !0,
        de = 0;
    function ge(e) {
        if (he) {
            for (
                var t,
                    n = v('.sidebar'),
                    r = x('.anchor'),
                    i = w(n, '.sidebar-nav'),
                    a = w(n, 'li.active'),
                    o = document.documentElement,
                    s = ((o && o.scrollTop) || document.body.scrollTop) - de,
                    l = 0,
                    c = r.length;
                l < c;
                l += 1
            ) {
                var u = r[l];
                if (u.offsetTop > s) {
                    t || (t = u);
                    break;
                }
                t = u;
            }
            if (t) {
                var p = ce[fe(decodeURIComponent(e), t.getAttribute('data-id'))];
                if (
                    p &&
                    p !== a &&
                    (a && a.classList.remove('active'),
                    p.classList.add('active'),
                    (a = p),
                    !ue && y.classList.contains('sticky'))
                ) {
                    var h = n.clientHeight,
                        d = a.offsetTop + a.clientHeight + 40,
                        g = d - 0 < h,
                        f = a.offsetTop >= i.scrollTop && d <= i.scrollTop + h ? i.scrollTop : g ? 0 : d - h;
                    n.scrollTop = f;
                }
            }
        }
    }
    function fe(e, t) {
        return e + '?id=' + t;
    }
    function me(e, t) {
        if (t) {
            var n,
                r = w('#' + t);
            r &&
                ((n = r),
                pe && pe.stop(),
                (he = !1),
                (pe = new le({
                    start: window.pageYOffset,
                    end: n.getBoundingClientRect().top + window.pageYOffset,
                    duration: 500,
                })
                    .on('tick', function(e) {
                        return window.scrollTo(0, e);
                    })
                    .on('done', function() {
                        (he = !0), (pe = null);
                    })
                    .begin()));
            var i = ce[fe(e, t)],
                a = w(v('.sidebar'), 'li.active');
            a && a.classList.remove('active'), i && i.classList.add('active');
        }
    }
    var ve = b.scrollingElement || b.documentElement;
    var be = {};
    function ye(e, i) {
        var o = e.compiler,
            a = e.raw;
        void 0 === a && (a = '');
        var t = e.fetch,
            n = be[a];
        if (n) {
            var r = n.slice();
            return (r.links = n.links), i(r);
        }
        var s = o._marked,
            l = s.lexer(a),
            c = [],
            u = s.InlineLexer.rules.link,
            p = l.links;
        l.forEach(function(e, a) {
            'paragraph' === e.type &&
                (e.text = e.text.replace(new RegExp(u.source, 'g'), function(e, t, n, r) {
                    var i = o.compileEmbed(n, r);
                    return i && c.push({ index: a, embed: i }), e;
                }));
        });
        var h = 0;
        !(function(e, r) {
            var t,
                n = e.embedTokens,
                i = e.compile,
                a = (e.fetch, 0),
                o = 1;
            if (!n.length) return r({});
            for (; (t = n[a++]); ) {
                var s = (function(n) {
                    return function(e) {
                        var t;
                        e &&
                            ('markdown' === n.embed.type
                                ? (t = i.lexer(e))
                                : 'code' === n.embed.type
                                ? (t = i.lexer(
                                      '```' + n.embed.lang + '\n' + e.replace(/`/g, '@DOCSIFY_QM@') + '\n```\n',
                                  ))
                                : 'mermaid' === n.embed.type
                                ? ((t = [
                                      {
                                          type: 'html',
                                          text: '<div class="mermaid">\n' + e + '\n</div>',
                                      },
                                  ]).links = {})
                                : ((t = [{ type: 'html', text: e }]).links = {})),
                            r({ token: n, embedToken: t }),
                            ++o >= a && r({});
                    };
                })(t);
                t.embed.url ? F(t.embed.url).then(s) : s(t.embed.html);
            }
        })({ compile: s, embedTokens: c, fetch: t }, function(e) {
            var t = e.embedToken,
                n = e.token;
            if (n) {
                var r = n.index + h;
                d(p, t.links), (l = l.slice(0, r).concat(t, l.slice(r + 1))), (h += t.length - 1);
            } else (be[a] = l.concat()), (l.links = be[a].links = p), i(l);
        });
    }
    function ke() {
        var e = x('.markdown-section>script').filter(function(e) {
            return !/template/.test(e.type);
        })[0];
        if (!e) return !1;
        var t = e.innerText.trim();
        if (!t) return !1;
        setTimeout(function(e) {
            window.__EXECUTE_RESULT__ = new Function(t)();
        }, 0);
    }
    function we(e, t, n) {
        var r, i, a;
        return (
            (t =
                'function' == typeof n
                    ? n(t)
                    : 'string' == typeof n
                    ? ((i = []),
                      (a = 0),
                      (r = n).replace(j, function(t, e, n) {
                          i.push(r.substring(a, n - 1)),
                              (a = n += t.length + 1),
                              i.push(function(e) {
                                  return ('00' + ('string' == typeof z[t] ? e[z[t]]() : z[t](e))).slice(-t.length);
                              });
                      }),
                      a !== r.length && i.push(r.substring(a)),
                      (function(e) {
                          for (var t = '', n = 0, r = e || new Date(); n < i.length; n++)
                              t += 'string' == typeof i[n] ? i[n] : i[n](r);
                          return t;
                      })(new Date(t)))
                    : t),
            e.replace(/{docsify-updated}/g, t)
        );
    }
    function xe(e) {
        e || (e = '<h1>404 - Not found</h1>'),
            this._renderTo('.markdown-section', e),
            !this.config.loadSidebar && this._renderSidebar(),
            !1 === this.config.executeScript || void 0 === window.Vue || ke()
                ? this.config.executeScript && ke()
                : setTimeout(function(e) {
                      var t = window.__EXECUTE_RESULT__;
                      t && t.$destroy && t.$destroy(), (window.__EXECUTE_RESULT__ = new window.Vue().$mount('#main'));
                  }, 0);
    }
    function _e(e) {
        var t = e.config;
        (e.compiler = new re(t, e.router)), f && (window.__current_docsify_compiler__ = e.compiler);
        var n,
            r,
            i,
            a,
            o,
            s = t.el || '#app',
            l = w('nav') || _('nav'),
            c = w(s),
            u = '',
            p = y;
        if (c) {
            if (
                (t.repo &&
                    (u += (a = t.repo)
                        ? (/\/\//.test(a) || (a = 'https://github.com/' + a),
                          '<a href="' +
                              (a = a.replace(/^git\+/, '')) +
                              '" class="github-corner" aria-label="View source on Github"><svg viewBox="0 0 250 250" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>')
                        : ''),
                t.coverpage &&
                    (u += ((i = ', 100%, 85%'),
                    '<section class="cover show" style="background: linear-gradient(to left bottom, hsl(' +
                        (Math.floor(255 * Math.random()) + i) +
                        ') 0%,hsl(' +
                        (Math.floor(255 * Math.random()) + i) +
                        ') 100%)"><div class="cover-main">\x3c!--cover--\x3e</div><div class="mask"></div></section>')),
                t.logo)
            ) {
                var h = /^data:image/.test(t.logo),
                    d = /(?:http[s]?:)?\/\//.test(t.logo),
                    g = /^\./.test(t.logo);
                h || d || g || (t.logo = J(e.router.getBasePath(), t.logo));
            }
            (u += ((r =
                '<button class="sidebar-toggle"><div class="sidebar-toggle-button"><span></span><span></span><span></span></div></button><aside class="sidebar">' +
                ((n = t).name
                    ? '<h1 class="app-name"><a class="app-name-link" data-nosearch>' +
                      (n.logo ? '<img alt=' + n.name + ' src=' + n.logo + '>' : n.name) +
                      '</a></h1>'
                    : '') +
                '<div class="sidebar-nav">\x3c!--sidebar--\x3e</div></aside>'),
            (m ? r + '<main>' : '<main>' + r) +
                '<section class="content"><article class="markdown-section" id="main">\x3c!--main--\x3e</article></section></main>')),
                e._renderTo(c, u, !0);
        } else e.rendered = !0;
        t.mergeNavbar && m ? (p = w('.sidebar')) : (l.classList.add('app-nav'), t.repo || l.classList.add('no-badge')),
            t.loadNavbar && A(p, l),
            t.themeColor &&
                (b.head.appendChild(
                    _('div', ((o = t.themeColor), '<style>:root{--theme-color: ' + o + ';}</style>')).firstElementChild,
                ),
                (function(n) {
                    if (!(window.CSS && window.CSS.supports && window.CSS.supports('(--v:red)'))) {
                        var e = x('style:not(.inserted),link');
                        [].forEach.call(e, function(e) {
                            if ('STYLE' === e.nodeName) N(e, n);
                            else if ('LINK' === e.nodeName) {
                                var t = e.getAttribute('href');
                                if (!/\.css$/.test(t)) return;
                                F(t).then(function(e) {
                                    var t = _('style', e);
                                    k.appendChild(t), N(t, n);
                                });
                            }
                        });
                    }
                })(t.themeColor)),
            e._updateRender(),
            $(y, 'ready');
    }
    var Se = {};
    var Ae = function(e) {
        this.config = e;
    };
    function Ce(e) {
        var t = location.href.indexOf('#');
        location.replace(location.href.slice(0, 0 <= t ? t : 0) + '#' + e);
    }
    (Ae.prototype.getBasePath = function() {
        return this.config.basePath;
    }),
        (Ae.prototype.getFile = function(e, t) {
            void 0 === e && (e = this.getCurrentPath());
            var n,
                r,
                i = this.config,
                a = this.getBasePath(),
                o = 'string' == typeof i.ext ? i.ext : '.md';
            return (
                (e = i.alias
                    ? (function e(t, n, r) {
                          var i = Object.keys(n).filter(function(e) {
                              return (Se[e] || (Se[e] = new RegExp('^' + e + '$'))).test(t) && t !== r;
                          })[0];
                          return i ? e(t.replace(Se[i], n[i]), n, t) : t;
                      })(e, i.alias)
                    : e),
                (n = e),
                (r = o),
                (e =
                    ((e = new RegExp('\\.(' + r.replace(/^\./, '') + '|html)$', 'g').test(n)
                        ? n
                        : /\/$/g.test(n)
                        ? n + 'README' + r
                        : '' + n + r) ===
                        '/README' + o &&
                        i.homepage) ||
                    e),
                (e = X(e) ? e : J(a, e)),
                t && (e = e.replace(new RegExp('^' + a), '')),
                e
            );
        }),
        (Ae.prototype.onchange = function(e) {
            void 0 === e && (e = p), e();
        }),
        (Ae.prototype.getCurrentPath = function() {}),
        (Ae.prototype.normalize = function() {}),
        (Ae.prototype.parse = function() {}),
        (Ae.prototype.toURL = function(e, t, n) {
            var r = n && '#' === e[0],
                i = this.parse(K(e));
            if (((i.query = d({}, i.query, t)), (e = (e = i.path + G(i.query)).replace(/\.md(\?)|\.md$/, '$1')), r)) {
                var a = n.indexOf('?');
                e = (0 < a ? n.substr(0, a) : n) + e;
            }
            return V('/' + e);
        });
    var Ee = (function(r) {
            function e(e) {
                r.call(this, e), (this.mode = 'hash');
            }
            return (
                r && (e.__proto__ = r),
                (((e.prototype = Object.create(r && r.prototype)).constructor = e).prototype.getBasePath = function() {
                    var e = window.location.pathname || '',
                        t = this.config.basePath;
                    return /^(\/|https?:)/g.test(t) ? t : V(e + '/' + t);
                }),
                (e.prototype.getCurrentPath = function() {
                    var e = location.href,
                        t = e.indexOf('#');
                    return -1 === t ? '' : e.slice(t + 1);
                }),
                (e.prototype.onchange = function(e) {
                    void 0 === e && (e = p), C('hashchange', e);
                }),
                (e.prototype.normalize = function() {
                    var e = this.getCurrentPath();
                    if ('/' === (e = K(e)).charAt(0)) return Ce(e);
                    Ce('/' + e);
                }),
                (e.prototype.parse = function(e) {
                    void 0 === e && (e = location.href);
                    var t = '',
                        n = e.indexOf('#');
                    0 <= n && (e = e.slice(n + 1));
                    var r = e.indexOf('?');
                    return (
                        0 <= r && ((t = e.slice(r + 1)), (e = e.slice(0, r))),
                        { path: e, file: this.getFile(e, !0), query: W(t) }
                    );
                }),
                (e.prototype.toURL = function(e, t, n) {
                    return '#' + r.prototype.toURL.call(this, e, t, n);
                }),
                e
            );
        })(Ae),
        $e = (function(t) {
            function e(e) {
                t.call(this, e), (this.mode = 'history');
            }
            return (
                t && (e.__proto__ = t),
                (((e.prototype = Object.create(
                    t && t.prototype,
                )).constructor = e).prototype.getCurrentPath = function() {
                    var e = this.getBasePath(),
                        t = window.location.pathname;
                    return (
                        e && 0 === t.indexOf(e) && (t = t.slice(e.length)),
                        (t || '/') + window.location.search + window.location.hash
                    );
                }),
                (e.prototype.onchange = function(r) {
                    void 0 === r && (r = p),
                        C('click', function(e) {
                            var t = 'A' === e.target.tagName ? e.target : e.target.parentNode;
                            if ('A' === t.tagName && !/_blank/.test(t.target)) {
                                e.preventDefault();
                                var n = t.href;
                                window.history.pushState({ key: n }, '', n), r();
                            }
                        }),
                        C('popstate', r);
                }),
                (e.prototype.parse = function(e) {
                    void 0 === e && (e = location.href);
                    var t = '',
                        n = e.indexOf('?');
                    0 <= n && ((t = e.slice(n + 1)), (e = e.slice(0, n)));
                    var r = J(location.origin),
                        i = e.indexOf(r);
                    return -1 < i && (e = e.slice(i + r.length)), { path: e, file: this.getFile(e), query: W(t) };
                }),
                e
            );
        })(Ae);
    var Le = {};
    function Te(e) {
        e.router.normalize(), (e.route = e.router.parse()), y.setAttribute('data-page', e.route.file);
    }
    function Re(e) {
        var t, n, r;
        (t = 'button.sidebar-toggle'),
            e.router,
            (n = function(e) {
                return y.classList.toggle('close');
            }),
            C((t = v(t)), 'click', function(e) {
                e.stopPropagation(), n();
            }),
            m &&
                C(y, 'click', function(e) {
                    return y.classList.contains('close') && n();
                }),
            (r = '.sidebar'),
            e.router,
            C((r = v(r)), 'click', function(e) {
                var t = e.target;
                'A' === t.nodeName &&
                    t.nextSibling &&
                    t.nextSibling.classList.contains('app-sub-sidebar') &&
                    $(t.parentNode, 'collapse');
            }),
            e.config.coverpage ? !m && C('scroll', ae) : y.classList.add('sticky');
    }
    function Pe(t, n, r, i, a, e) {
        (t = e ? t : t.replace(/\/$/, '')),
            (t = Q(t)) &&
                F(a.router.getFile(t + r) + n, !1, a.config.requestHeaders).then(i, function(e) {
                    return Pe(t, n, r, i, a);
                });
    }
    var Oe = Object.freeze({
        cached: s,
        hyphenate: o,
        hasOwn: l,
        merge: d,
        isPrimitive: c,
        noop: p,
        isFn: u,
        inBrowser: f,
        isMobile: m,
        supportsPushState: g,
        parseQuery: W,
        stringifyQuery: G,
        isAbsolutePath: X,
        getParentPath: Q,
        cleanPath: V,
        getPath: J,
        replaceSlug: K,
    });
    function Fe() {
        this._init();
    }
    var Ne,
        je,
        ze,
        Me,
        qe = Fe.prototype;
    (qe._init = function() {
        var n,
            t,
            r,
            e,
            i,
            a = this;
        (a.config = (function() {
            var e = d(
                    {
                        el: '#app',
                        repo: '',
                        maxLevel: 6,
                        subMaxLevel: 0,
                        loadSidebar: null,
                        loadNavbar: null,
                        homepage: 'README.md',
                        coverpage: '',
                        basePath: '',
                        auto2top: !1,
                        name: '',
                        themeColor: '',
                        nameLink: window.location.pathname,
                        autoHeader: !1,
                        executeScript: null,
                        noEmoji: !1,
                        ga: '',
                        ext: '.md',
                        mergeNavbar: !1,
                        formatUpdated: '',
                        externalLinkTarget: '_blank',
                        routerMode: 'hash',
                        noCompileLinks: [],
                    },
                    window.$docsify,
                ),
                t =
                    document.currentScript ||
                    [].slice.call(document.getElementsByTagName('script')).filter(function(e) {
                        return /docsify\./.test(e.src);
                    })[0];
            if (t) {
                for (var n in e)
                    if (l.call(e, n)) {
                        var r = t.getAttribute('data-' + o(n));
                        c(r) && (e[n] = '' === r || r);
                    }
                !0 === e.loadSidebar && (e.loadSidebar = '_sidebar' + e.ext),
                    !0 === e.loadNavbar && (e.loadNavbar = '_navbar' + e.ext),
                    !0 === e.coverpage && (e.coverpage = '_coverpage' + e.ext),
                    !0 === e.repo && (e.repo = ''),
                    !0 === e.name && (e.name = '');
            }
            return (window.$docsify = e);
        })()),
            ((n = a)._hooks = {}),
            (n._lifecycle = {}),
            ['init', 'mounted', 'beforeEach', 'afterEach', 'doneEach', 'ready'].forEach(function(e) {
                var t = (n._hooks[e] = []);
                n._lifecycle[e] = function(e) {
                    return t.push(e);
                };
            }),
            [].concat((t = a).config.plugins).forEach(function(e) {
                return u(e) && e(t._lifecycle, t);
            }),
            h(a, 'init'),
            (i = (r = a).config),
            (e = 'history' === (i.routerMode || 'hash') && g ? new $e(i) : new Ee(i)),
            (r.router = e),
            Te(r),
            (Le = r.route),
            e.onchange(function(e) {
                Te(r), r._updateRender(), Le.path !== r.route.path ? (r.$fetch(), (Le = r.route)) : r.$resetEvents();
            }),
            _e(a),
            Re(a),
            (function(t) {
                var e = t.config.loadSidebar;
                if (t.rendered) {
                    var n = oe(t.router, '.sidebar-nav', !0, !0);
                    e && n && (n.parentNode.innerHTML += window.__SUB_SIDEBAR__),
                        t._bindEventOnRendered(n),
                        t.$resetEvents(),
                        h(t, 'doneEach'),
                        h(t, 'ready');
                } else
                    t.$fetch(function(e) {
                        return h(t, 'ready');
                    });
            })(a),
            h(a, 'mounted');
    }),
        (qe.route = {}),
        ((Ne = qe)._renderTo = function(e, t, n) {
            var r = v(e);
            r && (r[n ? 'outerHTML' : 'innerHTML'] = t);
        }),
        (Ne._renderSidebar = function(e) {
            var t = this.config,
                n = t.maxLevel,
                r = t.subMaxLevel,
                i = t.loadSidebar;
            this._renderTo('.sidebar-nav', this.compiler.sidebar(e, n));
            var a = oe(this.router, '.sidebar-nav', !0, !0);
            i && a ? (a.parentNode.innerHTML += this.compiler.subSidebar(r) || '') : this.compiler.subSidebar(),
                this._bindEventOnRendered(a);
        }),
        (Ne._bindEventOnRendered = function(e) {
            var t,
                n = this.config,
                r = n.autoHeader,
                i = n.auto2top;
            if (
                ((function(e) {
                    var t = w('.cover.show');
                    de = t ? t.offsetHeight : 0;
                    for (var n = v('.sidebar'), r = x(n, 'li'), i = 0, a = r.length; i < a; i += 1) {
                        var o = r[i],
                            s = o.querySelector('a');
                        if (s) {
                            var l = s.getAttribute('href');
                            if ('/' !== l) {
                                var c = e.parse(l),
                                    u = c.query.id,
                                    p = c.path;
                                u && (l = fe(p, u));
                            }
                            l && (ce[decodeURIComponent(l)] = o);
                        }
                    }
                    if (!m) {
                        var h = e.getCurrentPath();
                        E('scroll', function() {
                            return ge(h);
                        }),
                            C('scroll', function() {
                                return ge(h);
                            }),
                            C(n, 'mouseover', function() {
                                ue = !0;
                            }),
                            C(n, 'mouseleave', function() {
                                ue = !1;
                            });
                    }
                })(this.router),
                r && e)
            ) {
                var a = v('#main'),
                    o = a.children[0];
                if (o && 'H1' !== o.tagName) {
                    var s = _('h1');
                    (s.innerText = e.innerText), A(a, s);
                }
            }
            i && (void 0 === (t = i) && (t = 0), (ve.scrollTop = !0 === t ? 0 : Number(t)));
        }),
        (Ne._renderNav = function(e) {
            e && this._renderTo('nav', this.compiler.compile(e)), this.config.loadNavbar && oe(this.router, 'nav');
        }),
        (Ne._renderMain = function(r, i, a) {
            var o = this;
            if ((void 0 === i && (i = {}), !r)) return xe.call(this, r);
            h(this, 'beforeEach', r, function(e) {
                var t,
                    n = function() {
                        i.updatedAt && (t = we(t, i.updatedAt, o.config.formatUpdated)),
                            h(o, 'afterEach', t, function(e) {
                                return xe.call(o, e);
                            });
                    };
                o.isHTML
                    ? ((t = o.result = r), n(), a())
                    : ye({ compiler: o.compiler, raw: e }, function(e) {
                          (t = o.compiler.compile(e)), n(), a();
                      });
            });
        }),
        (Ne._renderCover = function(e, t) {
            var n = v('.cover');
            if (($(v('main'), t ? 'add' : 'remove', 'hidden'), e)) {
                $(n, 'add', 'show');
                var r = this.coverIsHTML ? e : this.compiler.cover(e),
                    i = r.trim().match('<p><img.*?data-origin="(.*?)"[^a]+alt="(.*?)">([^<]*?)</p>$');
                if (i) {
                    if ('color' === i[2]) n.style.background = i[1] + (i[3] || '');
                    else {
                        var a = i[1];
                        $(n, 'add', 'has-mask'),
                            X(i[1]) || (a = J(this.router.getBasePath(), i[1])),
                            (n.style.backgroundImage = 'url(' + a + ')'),
                            (n.style.backgroundSize = 'cover'),
                            (n.style.backgroundPosition = 'center center');
                    }
                    r = r.replace(i[0], '');
                }
                this._renderTo('.cover-main', r), ae();
            } else $(n, 'remove', 'show');
        }),
        (Ne._updateRender = function() {
            !(function(e) {
                var t = v('.app-name-link'),
                    n = e.config.nameLink,
                    r = e.route.path;
                if (t)
                    if (c(e.config.nameLink)) t.setAttribute('href', n);
                    else if ('object' == typeof n) {
                        var i = Object.keys(n).filter(function(e) {
                            return -1 < r.indexOf(e);
                        })[0];
                        t.setAttribute('href', n[i]);
                    }
            })(this);
        }),
        (Me = function(e, t, n) {
            return ze && ze.abort && ze.abort(), (ze = F(e, !0, n));
        }),
        ((je = qe)._loadSideAndNav = function(e, t, n, r) {
            var i = this;
            return function() {
                if (!n) return r();
                Pe(
                    e,
                    t,
                    n,
                    function(e) {
                        i._renderSidebar(e), r();
                    },
                    i,
                    !0,
                );
            };
        }),
        (je._fetch = function(n) {
            var r = this;
            void 0 === n && (n = p);
            var e = this.route,
                i = e.path,
                a = G(e.query, ['id']),
                t = this.config,
                o = t.loadNavbar,
                s = t.requestHeaders,
                l = t.loadSidebar,
                c = this.router.getFile(i),
                u = Me(c + a, 0, s);
            (this.isHTML = /\.html$/g.test(c)),
                u.then(
                    function(e, t) {
                        return r._renderMain(e, t, r._loadSideAndNav(i, a, l, n));
                    },
                    function(e) {
                        r._fetchFallbackPage(c, a, n) || r._fetch404(c, a, n);
                    },
                ),
                o &&
                    Pe(
                        i,
                        a,
                        o,
                        function(e) {
                            return r._renderNav(e);
                        },
                        this,
                        !0,
                    );
        }),
        (je._fetchCover = function() {
            var t = this,
                e = this.config,
                n = e.coverpage,
                r = e.requestHeaders,
                i = this.route.query,
                a = Q(this.route.path);
            if (n) {
                var o = null,
                    s = this.route.path;
                if ('string' == typeof n) '/' === s && (o = n);
                else if (Array.isArray(n)) o = -1 < n.indexOf(s) && '_coverpage';
                else {
                    var l = n[s];
                    o = !0 === l ? '_coverpage' : l;
                }
                var c = Boolean(o) && this.config.onlyCover;
                return (
                    o
                        ? ((o = this.router.getFile(a + o)),
                          (this.coverIsHTML = /\.html$/g.test(o)),
                          F(o + G(i, ['id']), !1, r).then(function(e) {
                              return t._renderCover(e, c);
                          }))
                        : this._renderCover(null, c),
                    c
                );
            }
        }),
        (je.$fetch = function(e) {
            var t = this;
            void 0 === e && (e = p);
            var n = function() {
                h(t, 'doneEach'), e();
            };
            this._fetchCover()
                ? n()
                : this._fetch(function() {
                      t.$resetEvents(), n();
                  });
        }),
        (je._fetchFallbackPage = function(n, r, i) {
            var a = this;
            void 0 === i && (i = p);
            var e = this.config,
                t = e.requestHeaders,
                o = e.fallbackLanguages,
                s = e.loadSidebar;
            if (!o) return !1;
            var l = n.split('/')[1];
            if (-1 === o.indexOf(l)) return !1;
            var c = n.replace(new RegExp('^/' + l), '');
            return (
                Me(c + r, 0, t).then(
                    function(e, t) {
                        return a._renderMain(e, t, a._loadSideAndNav(n, r, s, i));
                    },
                    function() {
                        return a._fetch404(n, r, i);
                    },
                ),
                !0
            );
        }),
        (je._fetch404 = function(e, t, n) {
            var r = this;
            void 0 === n && (n = p);
            var i = this.config,
                a = i.loadSidebar,
                o = i.requestHeaders,
                s = i.notFoundPage,
                l = this._loadSideAndNav(e, t, a, n);
            if (s) {
                var c = (function(t, e) {
                    var n,
                        r,
                        i = e.notFoundPage,
                        a = '_404' + (e.ext || '.md');
                    switch (typeof i) {
                        case 'boolean':
                            r = a;
                            break;
                        case 'string':
                            r = i;
                            break;
                        case 'object':
                            r =
                                ((n = Object.keys(i)
                                    .sort(function(e, t) {
                                        return t.length - e.length;
                                    })
                                    .find(function(e) {
                                        return t.match(new RegExp('^' + e));
                                    })) &&
                                    i[n]) ||
                                a;
                    }
                    return r;
                })(e, this.config);
                return (
                    Me(this.router.getFile(c), 0, o).then(
                        function(e, t) {
                            return r._renderMain(e, t, l);
                        },
                        function() {
                            return r._renderMain(null, {}, l);
                        },
                    ),
                    !0
                );
            }
            return this._renderMain(null, {}, l), !1;
        }),
        (qe.$resetEvents = function() {
            me(this.route.path, this.route.query.id), this.config.loadNavbar && oe(this.router, 'nav');
        }),
        (window.Docsify = {
            util: Oe,
            dom: e,
            get: F,
            slugify: U,
            version: '4.8.6',
        }),
        (window.DocsifyCompiler = re),
        (window.marked = M),
        (window.Prism = a),
        (function(e) {
            var t = document.readyState;
            if ('complete' === t || 'interactive' === t) return setTimeout(e, 0);
            document.addEventListener('DOMContentLoaded', e);
        })(function(e) {
            return new Fe();
        });
})();
