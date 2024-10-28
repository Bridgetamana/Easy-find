import { render, screen } from '@testing-library/react'
import Greet from './greet'

describe ('Greet', () => {
    it ('renders Greet function', () => {
        render(<Greet />);

        screen.debug();
    })
})