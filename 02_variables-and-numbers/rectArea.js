function rectArea(p1, p2) {
  let x1 = p1.x;
  let x2 = p2.x;
  let y1 = p1.y;
  let y2 = p2.y;

  let area = Math.abs(x2 - x1) * Math.abs(y2-y1);
  console.log(area);
}

rectArea({x:2, y:3}, {x:10, y:5});
rectArea({x:10, y:5}, {x:2, y:3});
rectArea({x:-5, y:8}, {x:10, y:5});
rectArea({x:5, y:8}, {x:5, y:5});
rectArea({x:8, y:1}, {x:5, y:1});
