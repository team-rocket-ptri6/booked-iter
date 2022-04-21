import regeneratorRuntime from 'regenerator-runtime';
import ClubPage from '../../client/components/ClubPage.jsx';

import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';