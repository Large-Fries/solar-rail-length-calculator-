# Solar Rail Length Calculator

A lightweight web app to estimate solar mounting rail requirements.

## What it calculates

- Rail length needed for one row
- Total rail length across all rows and rails
- Waste-adjusted total rail length
- Approximate number of stock rails to purchase

All dimensional inputs/outputs use **millimeters (mm)**, with result conversions shown in **meters (m)**.

## Visual helpers

Key measurement fields include small inline diagrams right beside the inputs to show:

- Panel length and panel width
- Gap between adjacent panels
- End overhang
- Stock rail length

## Run locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.
