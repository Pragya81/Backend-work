import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import FAQ from '../models/faqModel.js';

const admin = new AdminJS({
  resources: [FAQ],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildRouter(admin);

export default adminRouter;
