from setuptools import setup
import os.path

version = '1.59.dev0'

long_description = '\n\n'.join([
    open('README.txt').read(),
    open(os.path.join('flooding_base', 'USAGE.txt')).read(),
    open('TODO.txt').read(),
    open('CREDITS.txt').read(),
    open('CHANGES.txt').read(),
    ])

install_requires = [
    'Django >= 1.4, < 1.7',
    'iso8601',
    'django-extensions',
    'django-nose',
    'django-markdown-deux',
    'south',
    ],

tests_require = [
    ]

setup(name='flooding-base',
      version=version,
      description="TODO",
      long_description=long_description,
      # Get strings from http://www.python.org/pypi?%3Aaction=list_classifiers
      classifiers=['Programming Language :: Python',
                   'Framework :: Django',
                   ],
      keywords=[],
      author='TODO',
      author_email='TODO@nelen-schuurmans.nl',
      url='',
      license='GPL',
      packages=['flooding_base'],
      include_package_data=True,
      zip_safe=False,
      install_requires=install_requires,
      tests_require=tests_require,
      extras_require={'test': tests_require},
      entry_points={
          'console_scripts': [
          ]},
      )
