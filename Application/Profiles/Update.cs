using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) 
            {
                // find and retrieve the user object from the context
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken);
                
                // set the Bio and display name to those within the request if not false otherwise set them to what they currently are
                user.Bio = request.Bio ?? user.Bio;
                user.DisplayName = request.DisplayName ?? user.DisplayName;

                // set the state to modified to catch where the update request contains no changes
                _context.Entry(user).State = EntityState.Modified;
                // save the context
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                // if save to db context was successful then return the Result of Result.Success
                if(result) return Result<Unit>.Success(Unit.Value);

                // otherwise return Failure
                return Result<Unit>.Failure("Failed to update profile");
            }
        }

    }
}