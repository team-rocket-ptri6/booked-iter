import React from 'React';
// import regeneratorRuntime from 'regenerator-runtime';
import ClubMessages from '../../client/components/ClubMessages.jsx';

import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';

describe('Unit testing ClubMessages component', () => {
  describe('on initial render', () => {
    let component;
    const props = {
      clubMessages: [
        {
          member_id: 1.1,
          admin: true,
          user_id: 1.2,
          user_name: 'janedoe',
          message_id: 1.3,
          message: 'test message 1',
          edited: false,
          created_at: 'some/date1',
        },
        {
          member_id: 2.1,
          admin: false,
          user_id: 2.2,
          user_name: 'alfredh',
          message_id: 2.3,
          message: 'test message 2',
          edited: true,
          created_at: 'some/date2',
        },
      ],
      setClubMessages: jest.fn(),
    };
    beforeAll(() => {
      component = render(<ClubMessages {...props} />);
    });

    test('displays the messages from props', async () => {
      const message1 = component.queryByText('janedoe');
      expect(message1).toBeTruthy();
      expect(message1.nextSibling).toHaveTextContent('test message 1');
      const message2 = component.queryByText('alfredh');
      expect(message2).teBeTruthy();
      expect(message2.nextSibling).toHaveTextContent('test message 2');
    });

    test('send message button is render and clickable', () => {
      const user = userEvent.setup();
      const sendButton = component.queryByRole('button', { name: /send/i });
      expect(sendButton).toBeTruthy();
      // * not sure about the best way to mock user intreactions here
      // await user.click(sendButton)
      // expect()
    });

    test('message input box is rendered and typeable', () => {
      const user = userEvent.setup();
      expect(screen.getByRole('textbox')).toBeTruthy();
      user.type(screen.getByRole('textbox'), 'A new Message');
      expect(screen.getByRole('textbox')).toHaveValue('A new Message');
    });
  });
});
