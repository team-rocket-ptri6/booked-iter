import { render, screen } from '@testing-libary/react';
import App from '../../client/App';

test('renders cover book image', () => {
  render(<App />);
  const coverImage = screen.getByTestId("required-cover-image");
  expect(coverImage).toBeInTheDocument();

});
