/*global define*/
define([
        '../Core/TimeInterval',
        './BooleanDataHandler',
        './NumberDataHandler',
        './ColorDataHandler',
        './DynamicProperty'
    ], function(
         TimeInterval,
         BooleanDataHandler,
         NumberDataHandler,
         ColorDataHandler,
         DynamicProperty) {
    "use strict";

    function DynamicPoint() {
        this.color = undefined;
        this.pixelSize = undefined;
        this.outlineColor = undefined;
        this.outlineWidth = undefined;
        this.show = undefined;
    }

    DynamicPoint.createOrUpdate = function(dynamicObject, packet, buffer, sourceUri) {
        //See if there's any actual data to process.
        var pointData = packet.point, point;
        if (typeof pointData !== 'undefined') {

            point = dynamicObject.point;

            //Create a new point if we don't have one yet.
            if (typeof point === 'undefined') {
                point = new DynamicPoint();
                dynamicObject.point = point;
            }

            var interval = pointData.interval;
            if (typeof interval !== 'undefined') {
                interval = TimeInterval.fromIso8601(interval);
            }

            //Create or update each of the properties.
            point.color = DynamicProperty.createOrUpdate(ColorDataHandler, pointData.color, buffer, sourceUri, point.color, interval);
            point.pixelSize = DynamicProperty.createOrUpdate(NumberDataHandler, pointData.pixelSize, buffer, sourceUri, point.pixelSize, interval);
            point.outlineColor = DynamicProperty.createOrUpdate(ColorDataHandler, pointData.outlineColor, buffer, sourceUri, point.outlineColor, interval);
            point.outlineWidth = DynamicProperty.createOrUpdate(NumberDataHandler, pointData.outlineWidth, buffer, sourceUri, point.outlineWidth, interval);
            point.show = DynamicProperty.createOrUpdate(BooleanDataHandler, pointData.show, buffer, sourceUri, point.show, interval);
        }
    };

    return DynamicPoint;
});
