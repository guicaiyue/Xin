/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /gh/HCLonely/Live2dV3@1.1.1/live2dv3.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var LIVE2DCUBISMFRAMEWORK;
!function(e) {
    var t = function() {
        return function(e, t) {
            this.time = e,
            this.value = t
        }
    }();
    e.AnimationPoint = t;
    var i = function() {
        return function(e, t) {
            this.time = e,
            this.value = t
        }
    }();
    e.AnimationUserDataBody = i;
    var r = function() {
        function e() {}
        return e.lerp = function(e, i, r) {
            return new t(e.time + (i.time - e.time) * r,e.value + (i.value - e.value) * r)
        }
        ,
        e.LINEAR = function(e, t, i) {
            var r = e[t + 0]
              , s = e[t + 1]
              , a = (i - r.time) / (s.time - r.time);
            return r.value + (s.value - r.value) * a
        }
        ,
        e.BEZIER = function(t, i, r) {
            var s = (r - t[i + 0].time) / (t[i + 3].time - t[i].time)
              , a = e.lerp(t[i + 0], t[i + 1], s)
              , n = e.lerp(t[i + 1], t[i + 2], s)
              , o = e.lerp(t[i + 2], t[i + 3], s)
              , l = e.lerp(a, n, s)
              , u = e.lerp(n, o, s);
            return e.lerp(l, u, s).value
        }
        ,
        e.STEPPED = function(e, t, i) {
            return e[t + 0].value
        }
        ,
        e.INVERSE_STEPPED = function(e, t, i) {
            return e[t + 1].value
        }
        ,
        e
    }();
    e.BuiltinAnimationSegmentEvaluators = r;
    var s = function() {
        return function(e, t) {
            this.offset = e,
            this.evaluate = t
        }
    }();
    e.AnimationSegment = s;
    var a = function() {
        function e(e, t, i) {
            this.targetId = e,
            this.points = t,
            this.segments = i
        }
        return e.prototype.evaluate = function(e) {
            for (var t = 0, i = this.segments.length - 1; t < i && this.points[this.segments[t + 1].offset].time < e; ++t)
                ;
            return this.segments[t].evaluate(this.points, this.segments[t].offset, e)
        }
        ,
        e
    }();
    e.AnimationTrack = a;
    var n = function() {
        function e(e) {
            var n = this;
            this.modelTracks = new Array,
            this.parameterTracks = new Array,
            this.partOpacityTracks = new Array,
            this.userDataBodys = new Array,
            this.duration = e.Meta.Duration,
            this.fps = e.Meta.Fps,
            this.loop = e.Meta.Loop,
            this.userDataCount = e.Meta.UserDataCount,
            this.totalUserDataSize = e.Meta.TotalUserDataSize,
            null != e.UserData && (e.UserData.forEach(function(e) {
                n.userDataBodys.push(new i(e.Time,e.Value))
            }),
            console.assert(this.userDataBodys.length === this.userDataCount)),
            e.Curves.forEach(function(e) {
                var i = e.Segments
                  , o = new Array
                  , l = new Array;
                o.push(new t(i[0],i[1]));
                for (var u = 2; u < i.length; u += 3) {
                    var h = o.length - 1
                      , c = r.LINEAR
                      , d = i[u];
                    1 == d ? (c = r.BEZIER,
                    o.push(new t(i[u + 1],i[u + 2])),
                    o.push(new t(i[u + 3],i[u + 4])),
                    u += 4) : 2 == d ? c = r.STEPPED : 3 == d && (c = r.INVERSE_STEPPED),
                    o.push(new t(i[u + 1],i[u + 2])),
                    l.push(new s(h,c))
                }
                var p = new a(e.Id,o,l);
                "Model" == e.Target ? n.modelTracks.push(p) : "Parameter" == e.Target ? n.parameterTracks.push(p) : "PartOpacity" == e.Target && n.partOpacityTracks.push(p)
            })
        }
        return e.fromMotion3Json = function(t) {
            if (null == t)
                return null;
            var i = new e(t);
            return i.isValid ? i : null
        }
        ,
        e.prototype.addAnimationCallback = function(e) {
            null == this._callbackFunctions && (this._callbackFunctions = new Array),
            this._callbackFunctions.push(e)
        }
        ,
        e.prototype.removeAnimationCallback = function(e) {
            if (null != this._callbackFunctions) {
                for (var t = -1, i = 0; i < this._callbackFunctions.length; i++)
                    if (this._callbackFunctions[i] === e) {
                        t = i;
                        break
                    }
                t >= 0 && this._callbackFunctions.splice(t, 1)
            }
        }
        ,
        e.prototype.clearAnimationCallback = function() {
            this._callbackFunctions = []
        }
        ,
        e.prototype.callAnimationCallback = function(e) {
            this._callbackFunctions.length > 0 && this._callbackFunctions.forEach(function(t) {
                t(e)
            })
        }
        ,
        e.prototype.evaluate = function(e, t, i, r, s, a) {
            if (void 0 === a && (a = null),
            !(t <= .01)) {
                if (this.loop)
                    for (; e > this.duration; )
                        e -= this.duration;
                if (this.parameterTracks.forEach(function(a) {
                    var n = r.parameters.ids.indexOf(a.targetId);
                    if (n >= 0) {
                        var o = a.evaluate(e);
                        1 != s[0][n] && (r.parameters.values[n] = r.parameters.defaultValues[n],
                        s[0][n] = !0),
                        r.parameters.values[n] = i(r.parameters.values[n], o, a.evaluate(0), t)
                    }
                }),
                this.partOpacityTracks.forEach(function(a) {
                    var n = r.parts.ids.indexOf(a.targetId);
                    if (n >= 0) {
                        var o = a.evaluate(e);
                        1 != s[1][n] && (r.parts.opacities[n] = 1,
                        s[1][n] = !0),
                        r.parts.opacities[n] = i(r.parts.opacities[n], o, a.evaluate(0), t)
                    }
                }),
                this.modelTracks.forEach(function(n) {
                    if (null != a) {
                        var o = a.getGroupById(n.targetId);
                        if (null != o && "Parameter" === o.target)
                            for (var l = 0, u = o.ids; l < u.length; l++) {
                                var h = u[l]
                                  , c = r.parameters.ids.indexOf(h);
                                if (c >= 0) {
                                    var d = n.evaluate(e);
                                    1 != s[0][c] && (r.parameters.values[c] = r.parameters.defaultValues[c],
                                    s[0][c] = !0),
                                    r.parameters.values[c] = i(r.parameters.values[c], d, n.evaluate(0), t)
                                }
                            }
                    }
                }),
                null != this._callbackFunctions)
                    for (var n = 0, o = this.userDataBodys; n < o.length; n++) {
                        var l = o[n];
                        this.isEventTriggered(l.time, e, this._lastTime, this.duration) && this.callAnimationCallback(l.value)
                    }
                this._lastTime = e
            }
        }
        ,
        e.prototype.isEventTriggered = function(e, t, i, r) {
            if (t > i) {
                if (e > i && e < t)
                    return !0
            } else if (e > 0 && e < t || e > i && e < r)
                return !0;
            return !1
        }
        ,
        Object.defineProperty(e.prototype, "isValid", {
            get: function() {
                return !0
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }();
    e.Animation = n;
    var o = function() {
        function e() {}
        return e.LINEAR = function(e, t) {
            return e / t
        }
        ,
        e
    }();
    e.BuiltinCrossfadeWeighters = o;
    var l = function() {
        return function() {}
    }();
    e.AnimationState = l;
    var u = function() {
        function e() {}
        return e.OVERRIDE = function(e, t, i, r) {
            return t * r + e * (1 - r)
        }
        ,
        e.ADD = function(e, t, i, r) {
            return e + (t - i) * r
        }
        ,
        e.MULTIPLY = function(e, t, i) {
            return e * (1 + (t - 1) * i)
        }
        ,
        e
    }();
    e.BuiltinAnimationBlenders = u;
    var h = function() {
        function e() {
            this.weight = 1
        }
        return Object.defineProperty(e.prototype, "currentAnimation", {
            get: function() {
                return this._animation
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "currentTime", {
            get: function() {
                return this._time
            },
            set: function(e) {
                this._time = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "isPlaying", {
            get: function() {
                return this._play
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.play = function(e, t) {
            void 0 === t && (t = 0),
            this._animation && t > 0 ? (this._goalAnimation = e,
            this._goalTime = 0,
            this._fadeTime = 0,
            this._fadeDuration = t) : (this._animation = e,
            this.currentTime = 0,
            this._play = !0)
        }
        ,
        e.prototype.resume = function() {
            this._play = !0
        }
        ,
        e.prototype.pause = function() {
            this._play = !1
        }
        ,
        e.prototype.stop = function() {
            this._play = !1,
            this.currentTime = 0
        }
        ,
        e.prototype._update = function(e) {
            this._play && (this._time += e,
            this._goalTime += e,
            this._fadeTime += e,
            (null == this._animation || !this._animation.loop && this._time > this._animation.duration) && (this.stop(),
            this._animation = null))
        }
        ,
        e.prototype._evaluate = function(e, t) {
            if (null != this._animation) {
                var i = this.weight < 1 ? this.weight : 1
                  , r = null != this._goalAnimation ? i * this.weightCrossfade(this._fadeTime, this._fadeDuration) : i;
                this._animation.evaluate(this._time, r, this.blend, e, t, this.groups),
                null != this._goalAnimation && (r = 1 - i * this.weightCrossfade(this._fadeTime, this._fadeDuration),
                this._goalAnimation.evaluate(this._goalTime, r, this.blend, e, t, this.groups),
                this._fadeTime > this._fadeDuration && (this._animation = this._goalAnimation,
                this._time = this._goalTime,
                this._goalAnimation = null))
            }
        }
        ,
        e
    }();
    e.AnimationLayer = h;
    var c = function() {
        function e(e, t, i) {
            this._target = e,
            this.timeScale = t,
            this._layers = i
        }
        return Object.defineProperty(e.prototype, "target", {
            get: function() {
                return this._target
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "isPlaying", {
            get: function() {
                var e = !1;
                return this._layers.forEach(function(t) {
                    t.isPlaying && (e = !0)
                }),
                e
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.addLayer = function(e, t, i) {
            void 0 === t && (t = u.OVERRIDE),
            void 0 === i && (i = 1);
            var r = new h;
            r.blend = t,
            r.weightCrossfade = o.LINEAR,
            r.weight = i,
            r.groups = this.groups,
            this._layers.set(e, r)
        }
        ,
        e.prototype.getLayer = function(e) {
            return this._layers.has(e) ? this._layers.get(e) : null
        }
        ,
        e.prototype.removeLayer = function(e) {
            return this._layers.has(e) ? this._layers.delete(e) : null
        }
        ,
        e.prototype.clearLayers = function() {
            this._layers.clear()
        }
        ,
        e.prototype.updateAndEvaluate = function(e) {
            var t = this;
            (e *= this.timeScale > 0 ? this.timeScale : 0) > .001 && this._layers.forEach(function(t) {
                t._update(e)
            });
            var i = new Array(this._target.parameters.count).fill(!1)
              , r = new Array(this._target.parts.count).fill(!1)
              , s = new Array(i,r);
            this._layers.forEach(function(e) {
                e._evaluate(t._target, s)
            })
        }
        ,
        e._create = function(t, i, r) {
            var s = new e(t,i,r);
            return s.isValid ? s : null
        }
        ,
        Object.defineProperty(e.prototype, "isValid", {
            get: function() {
                return null != this._target
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }();
    e.Animator = c;
    var d = function() {
        function e() {
            this._timeScale = 1,
            this._layerNames = new Array,
            this._layerBlenders = new Array,
            this._layerCrossfadeWeighters = new Array,
            this._layerWeights = new Array
        }
        return e.prototype.setTarget = function(e) {
            return this._target = e,
            this
        }
        ,
        e.prototype.setTimeScale = function(e) {
            return this._timeScale = e,
            this
        }
        ,
        e.prototype.addLayer = function(e, t, i) {
            return void 0 === t && (t = u.OVERRIDE),
            void 0 === i && (i = 1),
            this._layerNames.push(e),
            this._layerBlenders.push(t),
            this._layerCrossfadeWeighters.push(o.LINEAR),
            this._layerWeights.push(i),
            this
        }
        ,
        e.prototype.build = function() {
            for (var e = new Map, t = 0; t < this._layerNames.length; ++t) {
                var i = new h;
                i.blend = this._layerBlenders[t],
                i.weightCrossfade = this._layerCrossfadeWeighters[t],
                i.weight = this._layerWeights[t],
                e.set(this._layerNames[t], i)
            }
            return c._create(this._target, this._timeScale, e)
        }
        ,
        e
    }();
    e.AnimatorBuilder = d;
    var p = function() {
        function e(e, t) {
            this.x = e,
            this.y = t
        }
        return e.distance = function(e, t) {
            return Math.abs(e.substract(t).length)
        }
        ,
        e.dot = function(e, t) {
            return e.x * t.x + e.y * t.y
        }
        ,
        Object.defineProperty(e.prototype, "length", {
            get: function() {
                return Math.sqrt(e.dot(this, this))
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.add = function(t) {
            return new e(this.x + t.x,this.y + t.y)
        }
        ,
        e.prototype.substract = function(t) {
            return new e(this.x - t.x,this.y - t.y)
        }
        ,
        e.prototype.multiply = function(t) {
            return new e(this.x * t.x,this.y * t.y)
        }
        ,
        e.prototype.multiplyByScalar = function(t) {
            return this.multiply(new e(t,t))
        }
        ,
        e.prototype.divide = function(t) {
            return new e(this.x / t.x,this.y / t.y)
        }
        ,
        e.prototype.divideByScalar = function(t) {
            return this.divide(new e(t,t))
        }
        ,
        e.prototype.rotateByRadians = function(t) {
            return new e(this.x * Math.cos(t) - this.y * Math.sin(t),this.x * Math.sin(t) + this.y * Math.cos(t))
        }
        ,
        e.prototype.normalize = function() {
            var t = this.length;
            return new e(this.x / t,this.y / t)
        }
        ,
        e.zero = new e(0,0),
        e
    }();
    e.PhysicsVector2 = p;
    var f = function() {
        function e() {}
        return e.clampScalar = function(e, t, i) {
            return e < t ? t : e > i ? i : e
        }
        ,
        e.directionToDegrees = function(t, i) {
            var r = e.directionToRadians(t, i)
              , s = e.radiansToDegrees(r);
            return i.x - t.x > 0 ? -s : s
        }
        ,
        e.radiansToDegrees = function(e) {
            return 180 * e / Math.PI
        }
        ,
        e.radiansToDirection = function(e) {
            return new p(Math.sin(e),Math.cos(e))
        }
        ,
        e.degreesToRadians = function(e) {
            return e / 180 * Math.PI
        }
        ,
        e.directionToRadians = function(e, t) {
            var i = p.dot(e, t)
              , r = e.length * t.length;
            if (0 == r)
                return 0;
            var s = i / r;
            return Math.abs(s) <= 1 ? Math.acos(s) : 0
        }
        ,
        e.gravity = new p(0,-1),
        e.wind = new p(0,0),
        e.maximumWeight = 100,
        e.airResistance = 5,
        e.movementThreshold = .001,
        e.correctAngles = !0,
        e
    }();
    e.Physics = f;
    var m = function() {
        return function(e, t, i, r, s) {
            this.initialPosition = e,
            this.mobility = t,
            this.delay = i,
            this.acceleration = r,
            this.radius = s,
            this.position = e,
            this.lastPosition = this.position,
            this.lastGravity = new p(0,-1),
            this.force = new p(0,0),
            this.velocity = new p(0,0)
        }
    }();
    e.PhysicsParticle = m;
    var y = function() {
        function e(e, t, i) {
            this.x = e,
            this.y = t,
            this.angle = i
        }
        return e.prototype.add = function(t) {
            return new e(this.x + t.x,this.y + t.y,this.angle + t.angle)
        }
        ,
        e
    }();
    e.PhysicsFactorTuple = y;
    var _ = function() {
        return function(e, t, i) {
            this.minimum = e,
            this.maximum = t,
            this.def = i
        }
    }();
    e.PhysicsNormalizationTuple = _;
    var g = function() {
        return function(e, t) {
            this.position = e,
            this.angle = t
        }
    }();
    e.PhysicsNormalizationOptions = g;
    var v = function() {
        function e(e, t, i, r) {
            this.targetId = e,
            this.weight = t,
            this.factor = i,
            this.invert = r
        }
        return Object.defineProperty(e.prototype, "normalizedWeight", {
            get: function() {
                return f.clampScalar(this.weight / f.maximumWeight, 0, 1)
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.evaluateFactor = function(e, t, i, r, s) {
            console.assert(i > t);
            var a = this.getMiddleValue(t, i)
              , n = e - a;
            switch (Math.sign(n)) {
            case 1:
                if (0 == (o = i - a))
                    n = s.angle.def;
                else
                    0 == (l = s.angle.maximum - s.angle.def) ? n = s.angle.maximum : (n *= Math.abs(l / o),
                    n += s.angle.def);
                break;
            case -1:
                var o, l;
                if (0 == (o = a - t))
                    n = s.angle.def;
                else
                    0 == (l = s.angle.def - s.angle.minimum) ? n = s.angle.minimum : (n *= Math.abs(l / o),
                    n += s.angle.def);
                break;
            case 0:
                n = s.angle.def
            }
            var u = this.weight / f.maximumWeight;
            return n *= this.invert ? 1 : -1,
            new y(n * this.factor.x * u,n * this.factor.y * u,n * this.factor.angle * u)
        }
        ,
        e.prototype.getRangeValue = function(e, t) {
            var i = Math.max(e, t)
              , r = Math.min(e, t);
            return Math.abs(i - r)
        }
        ,
        e.prototype.getMiddleValue = function(e, t) {
            return Math.min(e, t) + this.getRangeValue(e, t) / 2
        }
        ,
        e
    }();
    e.PhysicsInput = v;
    var b = function() {
        function e(e, t, i, r, s, a) {
            this.targetId = e,
            this.particleIndex = t,
            this.weight = i,
            this.factor = s,
            this.invert = a,
            this.factor.angle *= r
        }
        return Object.defineProperty(e.prototype, "normalizedWeight", {
            get: function() {
                return f.clampScalar(this.weight / f.maximumWeight, 0, 1)
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.evaluateValue = function(e, t) {
            var i = e.x * this.factor.x + e.y * this.factor.y;
            if (this.factor.angle > 0) {
                var r = f.gravity;
                f.correctAngles && this.particleIndex > 1 && (r = t[this.particleIndex - 2].position.substract(t[this.particleIndex - 1].position));
                var s = f.directionToRadians(r, e);
                i += (e.x - r.x > 0 ? -s : s) * this.factor.angle
            }
            return i *= this.invert ? -1 : 1
        }
        ,
        e
    }();
    e.PhysicsOutput = b;
    var w = function() {
        function e(e, t, i, r) {
            this.input = e,
            this.output = t,
            this.particles = i,
            this.normalization = r
        }
        return e.prototype._update = function(e, t) {
            var i = this
              , r = t.parameters
              , s = new y(0,0,0);
            this.input.forEach(function(e) {
                var t = r.ids.indexOf(e.targetId);
                -1 != t && (s = s.add(e.evaluateFactor(r.values[t], r.minimumValues[t], r.maximumValues[t], r.defaultValues[t], i.normalization)))
            });
            var a = f.degreesToRadians(-s.angle)
              , n = new p(s.x,s.y).rotateByRadians(a);
            s.x = n.x,
            s.y = n.y;
            var o = a
              , l = f.radiansToDirection(o).normalize();
            this.particles.forEach(function(t, r) {
                if (0 != r) {
                    t.force = l.multiplyByScalar(t.acceleration).add(f.wind),
                    t.lastPosition = t.position;
                    var a = t.delay * e * 30
                      , n = t.position.substract(i.particles[r - 1].position)
                      , o = p.distance(p.zero, n)
                      , u = f.directionToDegrees(t.lastGravity, l)
                      , h = f.degreesToRadians(u) / f.airResistance;
                    n = n.rotateByRadians(h).normalize(),
                    t.position = i.particles[r - 1].position.add(n.multiplyByScalar(o));
                    var c = t.velocity.multiplyByScalar(a)
                      , d = t.force.multiplyByScalar(a).multiplyByScalar(a);
                    t.position = t.position.add(c).add(d);
                    var m = t.position.substract(i.particles[r - 1].position).normalize();
                    t.position = i.particles[r - 1].position.add(m.multiplyByScalar(t.radius)),
                    Math.abs(t.position.x) < f.movementThreshold && (t.position.x = 0),
                    t.velocity = 0 != a ? t.position.substract(t.lastPosition).divideByScalar(a).multiplyByScalar(t.mobility) : p.zero,
                    t.force = p.zero,
                    t.lastGravity = l
                } else
                    t.position = new p(s.x,s.y)
            })
        }
        ,
        e.prototype._evaluate = function(e) {
            var t = this
              , i = e.parameters;
            this.output.forEach(function(e) {
                if (!(e.particleIndex < 1 || e.particleIndex >= t.particles.length)) {
                    var r = i.ids.indexOf(e.targetId);
                    if (-1 != r) {
                        var s = t.particles[e.particleIndex - 1].position.substract(t.particles[e.particleIndex].position)
                          , a = f.clampScalar(e.evaluateValue(s, t.particles), i.minimumValues[r], i.maximumValues[r])
                          , n = i.values[r] * (1 - e.normalizedWeight) + a * e.normalizedWeight;
                        i.values[r] = f.clampScalar(n, i.minimumValues[r], i.maximumValues[r])
                    }
                }
            })
        }
        ,
        e
    }();
    e.PhysicsSubRig = w;
    var M = function() {
        function e(e, t, i) {
            var r = this;
            this.timeScale = 1,
            this.timeScale = t,
            this._target = e,
            e && (this._subRigs = new Array,
            i.PhysicsSettings.forEach(function(e) {
                var t = new Array;
                e.Input.forEach(function(e) {
                    var i = new y(1,0,0);
                    "Y" == e.Type ? (i.x = 0,
                    i.y = 1) : "Angle" == e.Type && (i.x = 0,
                    i.angle = 1),
                    t.push(new v(e.Source.Id,e.Weight,i,e.Reflect))
                });
                var i = new Array;
                e.Output.forEach(function(e) {
                    var t = new y(1,0,0);
                    "Y" == e.Type ? (t.x = 0,
                    t.y = 1) : "Angle" == e.Type && (t.x = 0,
                    t.angle = 1),
                    i.push(new b(e.Destination.Id,e.VertexIndex,e.Weight,e.Scale,t,e.Reflect))
                });
                var s = new Array;
                e.Vertices.forEach(function(e) {
                    var t = new p(e.Position.X,e.Position.Y);
                    s.push(new m(t,e.Mobility,e.Delay,e.Acceleration,e.Radius))
                });
                var a = e.Normalization
                  , n = new _(a.Position.Minimum,a.Position.Maximum,a.Position.Default)
                  , o = new _(a.Angle.Minimum,a.Angle.Maximum,a.Angle.Default)
                  , l = new g(n,o);
                r._subRigs.push(new w(t,i,s,l))
            }))
        }
        return e.prototype.updateAndEvaluate = function(e) {
            var t = this;
            (e *= this.timeScale > 0 ? this.timeScale : 0) > .01 && this._subRigs.forEach(function(i) {
                i._update(e, t._target)
            }),
            this._subRigs.forEach(function(e) {
                e._evaluate(t._target)
            })
        }
        ,
        e._fromPhysics3Json = function(t, i, r) {
            var s = new e(t,i,r);
            return s._isValid ? s : null
        }
        ,
        Object.defineProperty(e.prototype, "_isValid", {
            get: function() {
                return null != this._target
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }();
    e.PhysicsRig = M;
    var P = function() {
        function e() {
            this._timeScale = 1
        }
        return e.prototype.setTarget = function(e) {
            return this._target = e,
            this
        }
        ,
        e.prototype.setTimeScale = function(e) {
            return this._timeScale = e,
            this
        }
        ,
        e.prototype.setPhysics3Json = function(e) {
            return this._physics3Json = e,
            this
        }
        ,
        e.prototype.build = function() {
            return M._fromPhysics3Json(this._target, this._timeScale, this._physics3Json)
        }
        ,
        e
    }();
    e.PhysicsRigBuilder = P;
    var I = function() {
        function e(e, t) {
            var i = this;
            this._target = e,
            e && (this._version = t.Version,
            this._userDataCount = t.Meta.UserDataCount,
            this._totalUserDataSize = t.Meta.TotalUserDataSize,
            null != t.UserData && (this._userDataBodys = new Array,
            t.UserData.forEach(function(e) {
                i._userDataBodys.push(new E(e.Target,e.Id,e.Value))
            }),
            console.assert(this._userDataBodys.length === this._userDataCount)))
        }
        return e._fromUserData3Json = function(t, i) {
            var r = new e(t,i);
            return r._isValid ? r : null
        }
        ,
        Object.defineProperty(e.prototype, "_isValid", {
            get: function() {
                return null != this._target
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "userDataCount", {
            get: function() {
                return null == this._userDataBodys ? 0 : this._userDataCount
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "totalUserDataSize", {
            get: function() {
                return null == this._userDataBodys ? 0 : this._totalUserDataSize
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "userDataBodys", {
            get: function() {
                return null == this._userDataBodys ? null : this._userDataBodys
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.isExistUserDataById = function(e) {
            if (null == this._userDataBodys)
                return !1;
            for (var t = 0, i = this._userDataBodys; t < i.length; t++) {
                if (i[t].id === e)
                    return !0
            }
            return !1
        }
        ,
        e.prototype.getUserDataValueById = function(e) {
            if (null == this._userDataBodys)
                return null;
            for (var t = 0, i = this._userDataBodys; t < i.length; t++) {
                var r = i[t];
                if (r.id === e)
                    return r.value
            }
            return null
        }
        ,
        e.prototype.getUserDataTargetById = function(e) {
            if (null == this._userDataBodys)
                return null;
            for (var t = 0, i = this._userDataBodys; t < i.length; t++) {
                var r = i[t];
                if (r.id === e)
                    return r.target
            }
            return null
        }
        ,
        e.prototype.getUserDataBodyById = function(e) {
            if (null == this._userDataBodys)
                return null;
            for (var t = 0, i = this._userDataBodys; t < i.length; t++) {
                var r = i[t];
                if (r.id === e)
                    return r
            }
            return null
        }
        ,
        e
    }();
    e.UserData = I;
    var D = function() {
        function e() {}
        return e.prototype.setTarget = function(e) {
            return this._target = e,
            this
        }
        ,
        e.prototype.setUserData3Json = function(e) {
            return this._userData3Json = e
        }
        ,
        e.prototype.build = function() {
            return I._fromUserData3Json(this._target, this._userData3Json)
        }
        ,
        e
    }();
    e.UserDataBuilder = D;
    var x, E = function() {
        return function(e, t, i) {
            this.target = e,
            this.id = t,
            this.value = i
        }
    }();
    e.UserDataBody = E,
    function(e) {
        e[e.UNKNOWN = 0] = "UNKNOWN",
        e[e.ArtMesh = 1] = "ArtMesh"
    }(x || (x = {}));
    var B = function() {
        function e(e) {
            var t = this;
            void 0 !== e.Groups ? (this._groupBodys = new Array,
            e.Groups.forEach(function(e) {
                t._groupBodys.push(new S(e.Target,e.Name,e.Ids))
            })) : this._groupBodys = null
        }
        return Object.defineProperty(e.prototype, "data", {
            get: function() {
                return null == this._groupBodys ? null : this._groupBodys
            },
            enumerable: !0,
            configurable: !0
        }),
        e.fromModel3Json = function(t) {
            return new e(t)
        }
        ,
        e.prototype.getGroupById = function(e) {
            if (null != this._groupBodys)
                for (var t = 0, i = this._groupBodys; t < i.length; t++) {
                    var r = i[t];
                    if (r.name === e)
                        return r
                }
            return null
        }
        ,
        e
    }();
    e.Groups = B;
    var S = function() {
        return function(e, t, i) {
            this.target = e,
            this.name = t,
            this.ids = i
        }
    }();
    e.GroupBody = S
}(LIVE2DCUBISMFRAMEWORK || (LIVE2DCUBISMFRAMEWORK = {}));
var LIVE2DCUBISMPIXI, __extends = this && this.__extends || function() {
    var e = function(t, i) {
        return (e = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (e[i] = t[i])
        }
        )(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        e(t, i),
        t.prototype = null === i ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}();
!function(e) {
    var t = function(e) {
        function t(t, r, a, n, o, l) {
            var u = e.call(this) || this;
            if (u._coreModel = t,
            u._textures = r,
            u._animator = a,
            u._physicsRig = n,
            u._userData = o,
            u._groups = l,
            u._animator.groups = u._groups,
            null == u._coreModel)
                return u;
            u._meshes = new Array(u._coreModel.drawables.ids.length);
            for (var h = 0; h < u._meshes.length; ++h) {
                for (var c = u._coreModel.drawables.vertexUvs[h].slice(0, u._coreModel.drawables.vertexUvs[h].length), d = 1; d < c.length; d += 2)
                    c[d] = 1 - c[d];
                if (u._meshes[h] = new s(r[u._coreModel.drawables.textureIndices[h]],u._coreModel.drawables.vertexPositions[h],c,u._coreModel.drawables.indices[h],PIXI.DRAW_MODES.TRIANGLES),
                u._meshes[h].name = u._coreModel.drawables.ids[h],
                u._meshes[h].scale.y *= -1,
                u._meshes[h].isCulling = !Live2DCubismCore.Utils.hasIsDoubleSidedBit(u._coreModel.drawables.constantFlags[h]),
                Live2DCubismCore.Utils.hasBlendAdditiveBit(u._coreModel.drawables.constantFlags[h]))
                    if (u._coreModel.drawables.maskCounts[h] > 0) {
                        var p = new PIXI.Filter;
                        p.blendMode = PIXI.BLEND_MODES.ADD,
                        u._meshes[h].filters = [p]
                    } else
                        u._meshes[h].blendMode = PIXI.BLEND_MODES.ADD;
                else if (Live2DCubismCore.Utils.hasBlendMultiplicativeBit(u._coreModel.drawables.constantFlags[h]))
                    if (u._coreModel.drawables.maskCounts[h] > 0) {
                        var f = new PIXI.Filter;
                        f.blendMode = PIXI.BLEND_MODES.MULTIPLY,
                        u._meshes[h].filters = [f]
                    } else
                        u._meshes[h].blendMode = PIXI.BLEND_MODES.MULTIPLY;
                u.addChild(u._meshes[h])
            }
            return u._maskSpriteContainer = new i(t,u),
            u
        }
        return __extends(t, e),
        Object.defineProperty(t.prototype, "parameters", {
            get: function() {
                return this._coreModel.parameters
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "parts", {
            get: function() {
                return this._coreModel.parts
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "drawables", {
            get: function() {
                return this._coreModel.drawables
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "canvasinfo", {
            get: function() {
                return this._coreModel.canvasinfo
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "textures", {
            get: function() {
                return this._textures
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "animator", {
            get: function() {
                return this._animator
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "userData", {
            get: function() {
                return this._userData
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "meshes", {
            get: function() {
                return this._meshes
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "masks", {
            get: function() {
                return this._maskSpriteContainer
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "groups", {
            get: function() {
                return this._groups
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.update = function(e) {
            var t = this
              , i = .016 * e;
            this._animator.updateAndEvaluate(i),
            this._physicsRig && this._physicsRig.updateAndEvaluate(i),
            this._coreModel.update();
            for (var r = !1, s = 0; s < this._meshes.length; ++s)
                this._meshes[s].alpha = this._coreModel.drawables.opacities[s],
                this._meshes[s].visible = Live2DCubismCore.Utils.hasIsVisibleBit(this._coreModel.drawables.dynamicFlags[s]),
                Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(this._coreModel.drawables.dynamicFlags[s]) && (this._meshes[s].vertices = this._coreModel.drawables.vertexPositions[s],
                this._meshes[s].dirtyVertex = !0),
                Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(this._coreModel.drawables.dynamicFlags[s]) && (r = !0);
            r && this.children.sort(function(e, i) {
                var r = t._meshes.indexOf(e)
                  , s = t._meshes.indexOf(i);
                return t._coreModel.drawables.renderOrders[r] - t._coreModel.drawables.renderOrders[s]
            }),
            this._coreModel.drawables.resetDynamicFlags()
        }
        ,
        t.prototype.destroy = function(t) {
            null != this._coreModel && this._coreModel.release(),
            e.prototype.destroy.call(this, t),
            this.masks.destroy(),
            this._meshes.forEach(function(e) {
                e.destroy()
            }),
            (1 == t || t.texture) && this._textures.forEach(function(e) {
                e.destroy()
            })
        }
        ,
        t.prototype.getModelMeshById = function(e) {
            if (null == this._meshes)
                return null;
            for (var t = 0, i = this._meshes; t < i.length; t++) {
                var r = i[t];
                if (r.name === e)
                    return r
            }
            return null
        }
        ,
        t.prototype.addParameterValueById = function(e, t) {
            var i = this._coreModel.parameters.ids.indexOf(e);
            -1 != i && (this._coreModel.parameters.values[i] = this._coreModel.parameters.values[i] + t)
        }
        ,
        t._create = function(e, i, r, s, a, n) {
            void 0 === s && (s = null),
            void 0 === a && (a = null),
            void 0 === n && (n = null);
            var o = new t(e,i,r,s,a,n);
            return o.isValid ? o : (o.destroy(),
            null)
        }
        ,
        Object.defineProperty(t.prototype, "isValid", {
            get: function() {
                return null != this._coreModel
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    }(PIXI.Container);
    e.Model = t;
    var i = function(e) {
        function t(t, i) {
            var r = e.call(this) || this;
            r._maskShaderVertSrc = new String("\n            attribute vec2 aVertexPosition;\n            attribute vec2 aTextureCoord;\n            uniform mat3 projectionMatrix;\n            varying vec2 vTextureCoord;\n            void main(void){\n                gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n                vTextureCoord = aTextureCoord;\n            }\n            "),
            r._maskShaderFragSrc = new String("\n            varying vec2 vTextureCoord;\n            uniform sampler2D uSampler;\n            void main(void){\n                vec4 c = texture2D(uSampler, vTextureCoord);\n                c.r = c.a;\n                c.g = 0.0;\n                c.b = 0.0;\n                gl_FragColor = c;\n            }\n            "),
            r._maskShader = new PIXI.Filter(r._maskShaderVertSrc.toString(),r._maskShaderFragSrc.toString());
            var a = t.drawables.maskCounts
              , n = t.drawables.masks;
            r._maskMeshContainers = new Array,
            r._maskTextures = new Array,
            r._maskSprites = new Array;
            for (var o = 0; o < i.meshes.length; ++o)
                if (a[o] > 0) {
                    for (var l = new PIXI.Container, u = 0; u < n[o].length; ++u) {
                        var h = t.drawables.masks[o][u]
                          , c = new s(i.meshes[h].texture,i.meshes[h].vertices,i.meshes[h].uvs,i.meshes[h].indices,PIXI.DRAW_MODES.TRIANGLES);
                        c.name = i.meshes[h].name,
                        c.transform = i.meshes[h].transform,
                        c.worldTransform = i.meshes[h].worldTransform,
                        c.localTransform = i.meshes[h].localTransform,
                        c.isCulling = i.meshes[h].isCulling,
                        c.isMaskMesh = !0,
                        c.filters = [r._maskShader],
                        l.addChild(c)
                    }
                    l.transform = i.transform,
                    l.worldTransform = i.worldTransform,
                    l.localTransform = i.localTransform,
                    r._maskMeshContainers.push(l);
                    var d = PIXI.RenderTexture.create(0, 0);
                    r._maskTextures.push(d);
                    var p = new PIXI.Sprite(d);
                    r._maskSprites.push(p),
                    r.addChild(p),
                    i.meshes[o].mask = p
                }
            return r
        }
        return __extends(t, e),
        Object.defineProperty(t.prototype, "maskSprites", {
            get: function() {
                return this._maskSprites
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "maskMeshes", {
            get: function() {
                return this._maskMeshContainers
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.destroy = function(e) {
            this._maskSprites.forEach(function(e) {
                e.destroy()
            }),
            this._maskTextures.forEach(function(e) {
                e.destroy()
            }),
            this._maskMeshContainers.forEach(function(e) {
                e.destroy()
            }),
            this._maskShader = null
        }
        ,
        t.prototype.update = function(e) {
            for (var t = 0; t < this._maskSprites.length; ++t)
                e.render(this._maskMeshContainers[t], this._maskTextures[t], !0, null, !1)
        }
        ,
        t.prototype.resize = function(e, t) {
            for (var i = 0; i < this._maskTextures.length; ++i)
                this._maskTextures[i].resize(e, t, !1)
        }
        ,
        t
    }(PIXI.Container);
    e.MaskSpriteContainer = i;
    var r = function() {
        function e() {
            this._textures = new Array,
            this._timeScale = 1,
            this._animatorBuilder = new LIVE2DCUBISMFRAMEWORK.AnimatorBuilder
        }
        return e.prototype.setMoc = function(e) {
            return this._moc = e,
            this
        }
        ,
        e.prototype.setTimeScale = function(e) {
            return this._timeScale = e,
            this
        }
        ,
        e.prototype.setPhysics3Json = function(e) {
            return this._physicsRigBuilder || (this._physicsRigBuilder = new LIVE2DCUBISMFRAMEWORK.PhysicsRigBuilder),
            this._physicsRigBuilder.setPhysics3Json(e),
            this
        }
        ,
        e.prototype.setUserData3Json = function(e) {
            return this._userDataBuilder || (this._userDataBuilder = new LIVE2DCUBISMFRAMEWORK.UserDataBuilder),
            this._userDataBuilder.setUserData3Json(e),
            this
        }
        ,
        e.prototype.addTexture = function(e, t) {
            return this._textures.splice(e, 0, t),
            this
        }
        ,
        e.prototype.addAnimatorLayer = function(e, t, i) {
            return void 0 === t && (t = LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE),
            void 0 === i && (i = 1),
            this._animatorBuilder.addLayer(e, t, i),
            this
        }
        ,
        e.prototype.addGroups = function(e) {
            return this._groups = e,
            this
        }
        ,
        e.prototype.buildFromModel3Json = function(e, t, i) {
            var r = this
              , s = t.url
              , a = s.substring(0, s.lastIndexOf("/") + 1)
              , n = 0;
            void 0 !== t.data.FileReferences.Moc && e.add("moc", a + t.data.FileReferences.Moc, {
                xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER
            }),
            void 0 !== t.data.FileReferences.Textures && t.data.FileReferences.Textures.forEach(function(t) {
                e.add("texture" + n, a + t),
                n++
            }),
            void 0 !== t.data.FileReferences.Physics && e.add("physics", a + t.data.FileReferences.Physics, {
                xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
            }),
            void 0 !== t.data.FileReferences.UserData && e.add("userdata", a + t.data.FileReferences.UserData, {
                xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
            }),
            t.data.Groups,
            this._groups = LIVE2DCUBISMFRAMEWORK.Groups.fromModel3Json(t.data),
            e.load(function(e, t) {
                if (void 0 !== t.moc && r.setMoc(Live2DCubismCore.Moc.fromArrayBuffer(t.moc.data)),
                void 0 !== t.texture0)
                    for (var s = 0; s < n; s++)
                        r.addTexture(s, t["texture" + s].texture);
                void 0 !== t.physics && r.setPhysics3Json(t.physics.data),
                void 0 !== t.userdata && r.setUserData3Json(t.userdata.data);
                var a = r.build();
                i(a)
            })
        }
        ,
        e.prototype.build = function() {
            var e = Live2DCubismCore.Model.fromMoc(this._moc);
            if (null == e)
                return null;
            var i = this._animatorBuilder.setTarget(e).setTimeScale(this._timeScale).build()
              , r = null;
            this._physicsRigBuilder && (r = this._physicsRigBuilder.setTarget(e).setTimeScale(this._timeScale).build());
            var s = null;
            return this._userDataBuilder && (s = this._userDataBuilder.setTarget(e).build()),
            t._create(e, this._textures, i, r, s, this._groups)
        }
        ,
        e
    }();
    e.ModelBuilder = r;
    var s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.isCulling = !1,
            t.isMaskMesh = !1,
            t
        }
        return __extends(t, e),
        t.prototype._renderWebGL = function(t) {
            !0 === this.isMaskMesh ? t.state.setFrontFace(1) : t.state.setFrontFace(0),
            !0 === this.isCulling ? t.state.setCullFace(1) : t.state.setCullFace(0),
            e.prototype._renderWebGL.call(this, t),
            t.state.setFrontFace(0)
        }
        ,
        t
    }(PIXI.mesh.Mesh);
    e.CubismMesh = s
}(LIVE2DCUBISMPIXI || (LIVE2DCUBISMPIXI = {}));
class L2D {
    constructor(e) {
        this.basePath = e,
        this.loader = new PIXI.loaders.Loader(this.basePath),
        this.animatorBuilder = new LIVE2DCUBISMFRAMEWORK.AnimatorBuilder,
        this.timeScale = 1,
        this.models = {}
    }
    setPhysics3Json(e) {
        return this.physicsRigBuilder || (this.physicsRigBuilder = new LIVE2DCUBISMFRAMEWORK.PhysicsRigBuilder),
        this.physicsRigBuilder.setPhysics3Json(e),
        this
    }
    load(e, t) {
        if (this.models[e])
            t.changeCanvas(this.models[e]);
        else {
            const i = e + "/"
              , r = e + ".model3.json"
              , s = new Array;
            let a = 0;
            const n = new Array
              , o = new Array;
            this.loader.add(e + "_model", i + r, {
                xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
            }),
            o.push(e + "_model"),
            this.loader.load((r,o)=>{
                const l = o[e + "_model"].data;
                if (void 0 !== l.FileReferences.Moc && r.add(e + "_moc", i + l.FileReferences.Moc, {
                    xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER
                }),
                void 0 !== l.FileReferences.Textures && l.FileReferences.Textures.forEach(t=>{
                    r.add(e + "_texture" + a, i + t),
                    a++
                }
                ),
                void 0 !== l.FileReferences.Physics && r.add(e + "_physics", i + l.FileReferences.Physics, {
                    xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
                }),
                void 0 !== l.FileReferences.Motions)
                    for (const t in l.FileReferences.Motions)
                        l.FileReferences.Motions[t].forEach(t=>{
                            const s = t.File.split("/").pop().split(".").shift();
                            if (n.includes(e + "_" + s)) {
                                var a = e + "_" + s + String(Date.now());
                                r.add(a, i + t.File, {
                                    xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
                                }),
                                n.push(e + "_" + s)
                            } else
                                r.add(e + "_" + s, i + t.File, {
                                    xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
                                }),
                                n.push(e + "_" + s)
                        }
                        );
                let u = null;
                l.Groups,
                u = LIVE2DCUBISMFRAMEWORK.Groups.fromModel3Json(l),
                r.load((i,r)=>{
                    let o = null;
                    if (void 0 !== r[e + "_moc"] && (o = Live2DCubismCore.Moc.fromArrayBuffer(r[e + "_moc"].data)),
                    void 0 !== r[e + "_texture0"])
                        for (let t = 0; t < a; t++)
                            s.splice(t, 0, r[e + "_texture" + t].texture);
                    void 0 !== r[e + "_physics"] && this.setPhysics3Json(r[e + "_physics"].data);
                    const l = new Map;
                    n.forEach(t=>{
                        const i = t.split(e + "_").pop();
                        l.set(i, LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(r[t].data))
                    }
                    );
                    let h = null;
                    const c = Live2DCubismCore.Model.fromMoc(o);
                    if (null == c)
                        return;
                    const d = this.animatorBuilder.setTarget(c).setTimeScale(this.timeScale).build()
                      , p = this.physicsRigBuilder.setTarget(c).setTimeScale(this.timeScale).build();
                    (h = LIVE2DCUBISMPIXI.Model._create(c, s, d, p, null, u)).motions = l,
                    this.models[e] = h,
                    t.changeCanvas(h)
                }
                )
            }
            )
        }
    }
}
class l2dViewer {
    constructor({basePath: e, modelName: t, width: i, height: r, el: s}) {
        "object" != typeof Live2DCubismCore && console.error('live2dv3 failed to load:\nMissing live2dcubismcore.js\nPlease add "https://cdn.jsdelivr.net/gh/HCLonely/Live2dV3/js/live2dcubismcore.min.js" to the "<script>" tag.\nLook at https://github.com/HCLonely/Live2dV3'),
        "object" != typeof PIXI && console.error('live2dv3 failed to load:\nMissing pixi.js\nPlease add "https://cdn.jsdelivr.net/npm/pixi.js@4.6.1/dist/pixi.min.js" to the "<script>" tag.\nLook at https://github.com/HCLonely/Live2dV3'),
        this.l2d = new L2D(e),
        this.canvas = s,
        this.l2d.load(t, this),
        this.app = new PIXI.Application(i,r,{
            transparent: !0
        }),
        this.canvas.appendChild(this.app.view),
        this.app.ticker.add(e=>{
            this.model && (this.model.update(e),
            this.model.masks.update(this.app.renderer))
        }
        ),
        window.onresize = (e=>{
            void 0 === e && (e = null),
            this.app.view.style.width = i + "px",
            this.app.view.style.height = r + "px",
            this.app.renderer.resize(i, r),
            this.model && (this.model.position = new PIXI.Point(.5 * i,.5 * r),
            this.model.scale = new PIXI.Point(.14 * this.model.position.x,.14 * this.model.position.x),
            this.model.masks.resize(this.app.view.width, this.app.view.height))
        }
        ),
        this.isClick = !1,
        this.app.view.addEventListener("mousedown", e=>{
            this.isClick = !0
        }
        ),
        this.app.view.addEventListener("mousemove", e=>{
            if (this.isClick && (this.isClick = !1,
            this.model && (this.model.inDrag = !0)),
            this.model) {
                const t = this.model.position.x - e.offsetX
                  , i = this.model.position.y - e.offsetY;
                this.model.pointerX = -t / this.app.view.height,
                this.model.pointerY = -i / this.app.view.width
            }
        }
        ),
        this.app.view.addEventListener("mouseup", e=>{
            if (this.model) {
                if (this.isClick)
                    if (this.isHit("TouchHead", e.offsetX, e.offsetY))
                        this.startAnimation("touch_head", "base");
                    else if (this.isHit("TouchSpecial", e.offsetX, e.offsetY))
                        this.startAnimation("touch_special", "base");
                    else {
                        const e = ["touch_body", "main_1", "main_2", "main_3"]
                          , t = e[Math.floor(Math.random() * e.length)];
                        this.startAnimation(t, "base")
                    }
                this.isClick = !1,
                this.model.inDrag = !1
            }
        }
        )
    }
    changeCanvas(e) {
        this.app.stage.removeChildren(),
        this.model = e,
        this.model.update = this.onUpdate,
        this.model.animator.addLayer("base", LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1),
        this.app.stage.addChild(this.model),
        this.app.stage.addChild(this.model.masks),
        window.onresize()
    }
    onUpdate(e) {
        const t = .016 * e;
        if (!this.animator.isPlaying) {
            const e = this.motions.get("idle");
            this.animator.getLayer("base").play(e)
        }
        this._animator.updateAndEvaluate(t),
        this.inDrag && (this.addParameterValueById("ParamAngleX", 30 * this.pointerX),
        this.addParameterValueById("ParamAngleY", 30 * -this.pointerY),
        this.addParameterValueById("ParamBodyAngleX", 10 * this.pointerX),
        this.addParameterValueById("ParamBodyAngleY", 10 * -this.pointerY),
        this.addParameterValueById("ParamEyeBallX", this.pointerX),
        this.addParameterValueById("ParamEyeBallY", -this.pointerY)),
        this._physicsRig && this._physicsRig.updateAndEvaluate(t),
        this._coreModel.update();
        let i = !1;
        for (let e = 0; e < this._meshes.length; ++e)
            this._meshes[e].alpha = this._coreModel.drawables.opacities[e],
            this._meshes[e].visible = Live2DCubismCore.Utils.hasIsVisibleBit(this._coreModel.drawables.dynamicFlags[e]),
            Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(this._coreModel.drawables.dynamicFlags[e]) && (this._meshes[e].vertices = this._coreModel.drawables.vertexPositions[e],
            this._meshes[e].dirtyVertex = !0),
            Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(this._coreModel.drawables.dynamicFlags[e]) && (i = !0);
        i && this.children.sort((e,t)=>{
            const i = this._meshes.indexOf(e)
              , r = this._meshes.indexOf(t);
            return this._coreModel.drawables.renderOrders[i] - this._coreModel.drawables.renderOrders[r]
        }
        ),
        this._coreModel.drawables.resetDynamicFlags()
    }
    startAnimation(e, t) {
        if (!this.model)
            return;
        const i = this.model.motions.get(e);
        if (!i)
            return;
        const r = this.model.animator.getLayer(t);
        r && r.play(i)
    }
    isHit(e, t, i) {
        if (!this.model)
            return !1;
        const r = this.model.getModelMeshById(e);
        if (!r)
            return !1;
        const s = r.vertices;
        let a = s[0]
          , n = s[0]
          , o = s[1]
          , l = s[1];
        for (let e = 1; e < 4; ++e) {
            const t = s[0 + 2 * e]
              , i = s[0 + 2 * e + 1];
            t < a && (a = t),
            t > n && (n = t),
            i < o && (o = i),
            i > l && (l = i)
        }
        const u = r.worldTransform.tx - t
          , h = r.worldTransform.ty - i
          , c = -u / r.worldTransform.a
          , d = -h / r.worldTransform.d;
        return a <= c && c <= n && o <= d && d <= l
    }
}
//# sourceMappingURL=/sm/d52ca9a672c4066fa26f00ef7d5eef35b456f9f62ed7d7114650aa9ef2049b1a.map
