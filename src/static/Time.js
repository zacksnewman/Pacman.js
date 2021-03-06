//////////////////////////////////////////////////////
///
///     Zack Newman
///     A Collection of Helpful JS scripts
///     Created on 3.12.20
/// 
/// 
//////////////////////////////////////////////////////
class Time {
    constructor() {}

    // Time variables
    static startTime = 0.0;
    static timeSinceStart = 0.0;
    static deltaTime = 0.0;
    static scaledDeltaTime = 0.0;
    static frameCount = 0;
    // this.fps = 60;
    static timers = [];

    static setup() {
        Time.startTime = new Date().getTime();
        Time.timeSinceStart = new Date().getTime() - Time.startTime;
    }

    static update() {
        Time.frameCount++;

        var prevTimeSinceStart = this.timeSinceStart;

        Time.timeSinceStart = (new Date().getTime() - Time.startTime) / 1000;
        Time.deltaTime = Time.timeSinceStart - prevTimeSinceStart;
        Time.scaledDeltaTime = Time.deltaTime * 60;

        // Handle Timers
        Time.timers.forEach(timer => {
            if (Time.timeSinceStart >= timer.end) {
                timer.callback();
            }
        });
        Time.timers = Time.timers.filter(timer => Time.timeSinceStart < timer.end);
    }

    static reset() {
        Time.startTime = new Date().getTime();
        Time.timeSinceStart = 0.0;
        Time.deltaTime = 0.0;
        Time.scaledDeltaTime = 0.0;
        Time.frameCount = 0;
    }

    static addTimer(duration, callback) {
        Time.timers.push(new Timer(duration, callback));
    }
}