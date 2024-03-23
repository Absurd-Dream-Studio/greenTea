export function RectAndRect(
    r1x: number,
    r1y: number,
    r1w: number,
    r1h: number,
    r2x: number,
    r2y: number,
    r2w: number,
    r2h: number
): boolean {
    return r1x < r2x + r2w &&
        r1x + r1w > r2x &&
        r1y < r2y + r2h &&
        r1h + r1y > r2y
}

export function RectAndPoint(
    rx: number,
    ry: number,
    rw: number,
    rh: number,
    px: number,
    py: number
): boolean {
    return px > rx && px < rx + rw &&
        py > ry && py < ry + rh
}

export function RectAndCircle(
    rx: number, ry: number, rw: number, rh: number, cx: number, cy: number, cr: number
): boolean {
    // Compute the half dimensions of the rectangle
    let halfWidth = rw / 2;
    let halfHeight = rh / 2;

    // Compute the center point of the rectangle
    let rectCenterX = rx + halfWidth;
    let rectCenterY = ry + halfHeight;

    // Compute the vector from the rectangle center to the circle center
    let dx = cx - rectCenterX;
    let dy = cy - rectCenterY;

    // Compute the absolute values of this vector
    let absDx = Math.abs(dx);
    let absDy = Math.abs(dy);

    // If the circle center is inside the rectangle, they're colliding
    if (absDx <= halfWidth && absDy <= halfHeight) {
        return true;
    }

    // If the circle is too far from the rectangle, they can't be colliding
    if (absDx > (halfWidth + cr) || absDy > (halfHeight + cr)) {
        return false;
    }

    // If the circle is near the corner of the rectangle, compute the distance to the corner and check it against the circle radius
    if (absDx <= (halfWidth) && absDy <= (halfHeight + cr)) {
        return true;
    }
    if (absDy <= (halfHeight) && absDx <= (halfWidth + cr)) {
        return true;
    }

    // Compute the distance from the circle center to the corner of the rectangle
    let cornerDistanceSq = Math.pow(absDx - halfWidth, 2) + Math.pow(absDy - halfHeight, 2);

    // The circle and rectangle are colliding if the distance to the corner is less than the circle radius
    return cornerDistanceSq <= Math.pow(cr, 2);
}

export function CircleAndPoint(
    cx: number,
    cy: number,
    cr: number,
    px: number,
    py: number
): boolean {
    let distance: number = (px - cx) * (px - cx) + (py - cy) * (py - cy)
    distance = Math.sqrt(distance)
    return distance < cr
}

export function CircleAndCircle(
    c1x: number,
    c1y: number,
    c1r: number,
    c2x: number,
    c2y: number,
    c2r: number
) {
    let distance: number = (c1x - c2x) * (c1x - c2x) + (c1y - c2y) * (c1y - c2y)
    distance = Math.sqrt(distance)
    return distance < c1r + c2r
}