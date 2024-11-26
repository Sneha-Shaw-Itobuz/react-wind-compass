# React Wind Compass

The React Wind Compass package provides an intuitive and customizable compass component for your web applications. Designed with flexibility in mind, it allows developers to display directional data, making it ideal for weather apps, navigation tools, and interactive dashboards.

## Installation

Install react-wind-compass with npm

```bash
  npm install react-wind-compass
```

or with yarn

```bash
  yarn add react-wind-compass
```

## Features

- Customizable Direction : Set an initial direction angle to represent the compass's starting orientation.

- Snapping Mechanism: Adjust the snapAngle property to snap the compass direction to predefined intervals for a smoother user experience.

- Fixed or Dynamic Mode: Use the fixed property to toggle between a static compass display or a dynamic interactive mode.

- Simple Integration: Easily integrate into any React project with minimal configuration.

## Usage/Examples

### Fixed Mode

```javascript
import Compass from "react-wind-compass";

function App() {
  return <Compass directionAngle={0} />;
}
```

### Dynamic Mode

```javascript
import Compass from "react-wind-compass";

function App() {
  const [angle, setAngle] = useState(0);
  return (
    <Compass
      // for creating a smooth user experience (default : 1).
      snapAngle={1}
      //default angle is 0.
      directionAngle={angle}
      //to enable user to set angle manually
      fixed={false}
      //onChange
      onAngleChanged={setAngle}
    />
  );
}
```
