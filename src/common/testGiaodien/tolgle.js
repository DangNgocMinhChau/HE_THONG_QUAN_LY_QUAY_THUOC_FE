import { CheckboxToggle } from "react-rainbow-components";
import React, { useState } from "react";
import { Modal, Button } from "react-rainbow-components";
export default function Tolgle(props) {
  const handleOnChange = () => {
    const { value } = this.state;
    // return this.setState({ value: !value });
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rainbow-p-vertical_large rainbow-p-left_x-large">
      <Modal
        isOpen={isOpen}
        // onRequestClose={this.handleOnClose}
        title="Modal Header"
      >
        <p>
          A rainbow is a meteorological phenomenon that is caused by reflection,
          refraction and dispersion of light in water droplets resulting in a
          spectrum of light appearing in the sky. It takes the form of a
          multicoloured circular arc. Rainbows caused by sunlight always appear
          in the section of sky directly opposite the sun. Rainbows can be full
          circles. However, the observer normally sees only an arc formed by
          illuminated.
        </p>
      </Modal>
    </div>
  );
}
