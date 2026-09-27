import React, { useEffect } from 'react';
import { LuUser } from 'react-icons/lu';
import { FaRegEnvelope, FaRegStickyNote } from 'react-icons/fa';
import PrimaryButton from '../ui/PrimaryButton';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContactForm } from '../hooks/useContactForm';
import { trackEvent } from '../utils/analytics';

const ContactForm = () => {
  const { state, handleFormSubmit } = useContactForm('xvoebwnj');

  useEffect(() => {
    if (state.succeeded) {
      trackEvent('contact_form_submit', { form_id: 'xvoebwnj' });
    }
  }, [state.succeeded]);

  return (
    <div
      style={{ boxShadow: '3px 3px 0px rgba(232,248,139,1)' }}
      className='bg-gradient-to-tr from-primary to-transparent p-7 md:p-12 lg:p-20'
    >
      <form
        className='flex flex-col gap-3 text-primary relative'
        onSubmit={handleFormSubmit}
      >
        <input
          type='hidden'
          name='_subject'
          value='New portfolio inquiry — reactiveferdous.com'
        />
        {/* Honeypot — leave empty */}
        <input
          type='text'
          name='company'
          tabIndex={-1}
          autoComplete='off'
          aria-hidden='true'
          className='absolute -left-[9999px] h-0 w-0 opacity-0'
        />

        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <LuUser className='absolute text-2xl top-[14px] left-2.5' />
          <motion.input
            type='text'
            name='name'
            required
            placeholder='Enter Name'
            className='w-full border border-primary pl-10 p-3.5 placeholder:text-primary'
          />
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <FaRegEnvelope className='absolute text-xl top-[17px] left-3' />
          <input
            type='email'
            name='email'
            required
            placeholder='Enter Email'
            className='w-full border border-primary pl-10 p-3.5 placeholder:text-primary'
          />
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <FaRegStickyNote className='absolute text-xl top-[17px] left-3' />
          <textarea
            name='description'
            required
            rows={4}
            placeholder="Have something to say? We'd love to hear! :D"
            className='w-full border border-primary pl-10 p-3.5 placeholder:text-primary resize-none'
          />
        </motion.div>
        <div className='self-end'>
          <PrimaryButton type='submit' disabled={state.submitting}>
            {state.submitting ? 'Submitting' : 'Mail Me!'}
          </PrimaryButton>
        </div>
        <p className='text-xs text-primary/80'>
          We only use your details to reply. See our{' '}
          <Link to='/privacy' className='underline underline-offset-2'>
            Privacy Policy
          </Link>
          .
        </p>
        {!state.submitting && state.succeeded && (
          <div className='mt-2 rounded-xl border border-secondary/40 bg-zinc-950/80 p-4 text-left'>
            <p className='text-secondary font-semibold text-sm mb-1'>
              Message sent
            </p>
            <p className='text-zinc-200 text-sm leading-relaxed'>
              Thanks — check your inbox for a confirmation from{' '}
              <span className='text-white'>contact@reactiveferdous.com</span>.
              I&apos;ll reply personally within one business day.
            </p>
          </div>
        )}
        {state.errors && (
          <p className='text-red-300 text-sm mt-2'>
            Something went wrong. Email{' '}
            <a
              className='underline'
              href='mailto:contact@reactiveferdous.com'
            >
              contact@reactiveferdous.com
            </a>{' '}
            instead.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
